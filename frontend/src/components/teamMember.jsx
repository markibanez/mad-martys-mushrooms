import React from "react";
import { Col, Image } from "react-bootstrap";

export default function TeamMember({
  children,
  index,
  position,
  name,
  avatarUrl,
  contacts,
  ...props
}) {
  return (
    <Col key={index} className="team__member">
      <Image
        key={index + 1}
        src={`${avatarUrl}`}
        alt=""
        fluid
        thumbnail
        className="team__member__avatar mb-1"
      />
      <div className="team__member__name-position mb-4">{name} - {position}</div>
    </Col>
  );
}
