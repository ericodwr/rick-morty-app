'use client';

import React, { useEffect, useState } from 'react';
import { api } from '../api';
import Image from 'next/image';
import { useAppContext } from '../context/AppProvider';
import Card from './Card';
import { Col, Container, Row } from 'react-bootstrap';

const CardList = () => {
  const { data } = useAppContext();

  return (
    <div>
      <Row>
        {data?.map((d, i) => {
          return <Card id={d.id} key={i} imgUrl={d.image} name={d.name} />;
        })}
      </Row>
    </div>
  );
};

export default CardList;
