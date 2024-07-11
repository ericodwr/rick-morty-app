import Image from 'next/image';
import React from 'react';
import { Col } from 'react-bootstrap';
import Link from 'next/link';

const Card = ({ id, name, imgUrl }) => {
  return (
    <Col
      md={3}
      className="d-flex flex-column justify-content-center align-items-center tw-cursor-pointer hover:tw--inset-y-2 "
    >
      <Link
        href={`/characters/${id}`}
        className="d-flex flex-column justify-content-center align-items-center text-dark text-decoration-none"
      >
        <Image src={imgUrl} alt={id} width={150} height={150} />
        <p>{name}</p>
      </Link>
    </Col>
  );
};

export default Card;
