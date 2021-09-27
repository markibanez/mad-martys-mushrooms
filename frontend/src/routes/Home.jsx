import { useState } from "react";
import { Row, Col, Image, Modal, Button, Form } from "react-bootstrap";
import { ethers } from "ethers";

import teamData from "../data/team.json";
import TeamMember from "../components/teamMember";

import MartyAloneImg from "../assets/img/marty-alone-green.jpg";
import MainImg from "../assets/img/headermain.png";

import artifact from '../contract-artifact.json'

export default function Home(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [qtyToMint, setQtyToMint] = useState(1)
    const onQtyChanged = e => {
        setQtyToMint(e.target.value)
    }

    const chainId = '0x4'
    const contractAddress = '0x4D7fc3eEB59A75207702894282e132470130a0Ed'

    const mint = async () => {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId }]
        })
        await window.ethereum.request({ method: 'eth_requestAccounts' })

        const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
        const signer = provider.getSigner()

        const contract = new ethers.Contract(contractAddress, artifact.abi, signer)
        const price = (await contract.NFT_PRICE()).toBigInt()
        await contract.mint(qtyToMint, { value: window.BigInt(qtyToMint) * price })
    }

    return (
        <>
            <div className="section section-about">
                <a name="about">
                    <h2 className="section__title">In Search of the Magic Mushroom</h2>
                </a>
                <div className="section__content">
                    <Image
                        src={MartyAloneImg}
                        alt="Marty"
                        className="d-none d-lg-block float-md-end marty-on-left w-25 ps-4 pb-2"
                    />

                    <p>
                        As he cast his mind back to the year 1973, remembering himself as
                        the young PHD student full of ambition, life and experimenting with
                        Mushrooms, Marty smiled fondly.
                    </p>
                    <p>
                        Between 1973 and today, Marty's life has changed dramatically. He
                        received his PHD after creating a thesis surrounding the topic of
                        single dose psilocybin and how this drug may substantially improve
                        quality of life.
                    </p>
                    <p>
                        However, Marty couldn’t just stop there. Each day he chased his
                        initial psychoactive experience, so he grew, developed and mutated
                        Mushrooms in hopes of achieving that long lost initial high. Soon,
                        Marty became known as Mad Marty from the Mushroom Farm.
                    </p>
                    <p>
                        Today, Mad Marty is ready to unleash his creations to the world,
                        with some Mushrooms containing secret prizes that will only be
                        shared with its owner.
                    </p>
                </div>
                <img src={MainImg} className="img-fluid" alt="" />
            </div>
            <div className="section section-creations">
                <a name="creations">
                    <h2 className="section__title">Marty's Creations and Mint</h2>
                </a>
                <div className="section__content">
                    <p>
                        There are 8888 of Mad Marty’s Mushrooms living on the Ethereum
                        blockchain which will be available to mint for 0.03eth each and up
                        to a maximum of 20 per transaction.
                    </p>
                    <p className="w-100 text-center">
                        <a className={"inline btn btn-success btn-lg px-4"} onClick={handleShow}>
                            <h4>Click here to mint...</h4>
                        </a>
                    </p>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        centered
                        contentClassName="bg-dark p-3"
                    >
                        <Modal.Header closeButton closeVariant="white btn-sm" >
                            <Modal.Title className="lh-1">Mint your mushrooms</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className={"bg-dark"}>
                            <label className="w-100 text-center">
                                Quantity to mint
                                <br />
                                <input type="number" min="1" value={qtyToMint} onChange={onQtyChanged} style={{ width: '150px', textAlign: 'center' }} />
                            </label>
                            <br /><br />
                            <Button variant="primary px-4 w-100" onClick={mint}>
                                <h4>Mint</h4>
                            </Button>
                        </Modal.Body>
                    </Modal>
                    <Row className="row row-cols-1 row-cols-md-3">
                        {[...Array(3)].map((x, index) => (
                            <Col key={index}>
                                <Image
                                    key={index + 1}
                                    src={`img/bears/carousel/${index + 1}.png`}
                                    alt=""
                                    className="mb-4"
                                    fluid
                                    thumbnail
                                />
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
            <div className="section section-airdrops">
                <a name="airdrops">
                    <h2 className="section__title">Airdrops</h2>
                </a>
                <div className="section__content">
                    <p>
                        Each and every one of Marty’s Mushrooms are magic, just some of the
                        Mushrooms are more magic than others. Once all Mushrooms have been
                        minted, there will be a series of Airdrops including big name NFTs
                        and Eth to those lucky mushroom holders.
                    </p>
                </div>
            </div>
            <div className="section section-deflationary">
                <a name="deflationary">
                    <h2 className="section__title">Deflationary Mushrooms</h2>
                </a>
                <div className="section__content">
                    <p>
                        In the weeks after the mushrooms sell out, mushroom holders will be
                        able to send their mushrooms to Marty’s laboratory for him to create
                        a brand new mushroom in return.
                    </p>
                    <p>
                        As Marty needs more mushrooms to create his next mushroom, this is a
                        deflationary mechanism.
                    </p>
                    <p>
                        For every 2 mushrooms submitted, you will receive 1 of Marty’s new
                        creations.
                    </p>
                </div>
            </div>
            <div className="section section-team">
                <a name="team">
                    <h2 className="section__title">Team</h2>
                </a>
                <div className="section__content">
                    <p>
                        We firmly believe in hiring, developing, and motivating great
                        Mushroom people.
                    </p>
                    <Row className="row row-cols-2 row-cols-md-4">
                        {teamData.map((el, idx) => (
                            <TeamMember key={idx} {...{ ...el, index: idx }} />
                        ))}
                    </Row>
                </div>
            </div>
        </>
    );
}
