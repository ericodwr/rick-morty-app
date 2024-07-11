import Image from 'next/image';
import { api } from '../../api';
import React from 'react';
import { convertDateToID } from '@/app/utils/convertDate';
import Link from 'next/link';
import AddLocationModal from '@/app/components/AddLocationModal';

const fetchData = async (id) => {
  try {
    const result = await api.get(`/${id}`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export async function generateMetadata({ params, searchParams }) {
  const id = params.id;

  const data = await fetchData(id);

  return {
    title: `${data.data.name} | Rick and Morty`,
  };
}

const Page = async ({ params }) => {
  const { data } = await fetchData(params.id);
  return (
    <div className="mt-5">
      <Link href={'/'} className="text-dark text-decoration-none">
        <p className="d-flex align-items-center">&#8592; Back</p>
      </Link>
      <h2 className="text-center">{data.name}</h2>
      <div className="row mt-5">
        <div className="col">
          <Image src={data.image} width={300} height={300} alt={data.id} />
        </div>
        <div className="col">
          <div className="row">
            {/* Status */}
            <div className="col-5">
              <p>Status</p>
            </div>
            <div className="col-2">
              <p>:</p>
            </div>
            <div className="col-5">
              <p>{data.status}</p>
            </div>
            {/* Status */}

            {/* Species */}
            <div className="col-5">
              <p>Species</p>
            </div>
            <div className="col-2">
              <p>:</p>
            </div>
            <div className="col-5">
              <p>{data.species}</p>
            </div>
            {/* Species */}

            {/* Type */}
            <div className="col-5">
              <p>Type</p>
            </div>
            <div className="col-2">
              <p>:</p>
            </div>
            <div className="col-5">
              <p>{data.type ? data.type : 'Unknown'}</p>
            </div>
            {/* Type */}

            {/* Gender */}
            <div className="col-5">
              <p>Gender</p>
            </div>
            <div className="col-2">
              <p>:</p>
            </div>
            <div className="col-5">
              <p>{data.gender ? data.gender : 'Unknown'}</p>
            </div>
            {/* Gender */}

            {/* Origin */}
            <div className="col-5">
              <p>Origin</p>
            </div>
            <div className="col-2">
              <p>:</p>
            </div>
            <div className="col-5">
              <p>{data.origin.name ? data.origin.name : 'Unknown'}</p>
            </div>
            {/* Origin */}

            {/* Appear on the Show */}
            <div className="col-5">
              <p>Created</p>
            </div>
            <div className="col-2">
              <p>:</p>
            </div>
            <div className="col-5">
              <p>{convertDateToID(data.created)}</p>
            </div>
            {/* Created */}

            {/* Appear on the Show */}
            <div className="col-5">
              <p>Appear On The Show</p>
            </div>
            <div className="col-2">
              <p>:</p>
            </div>
            <div className="col-5">
              <p>{data.episode.length} times</p>
            </div>
            {/* Appear on the Show */}

            {/* Location */}
            <div className="col-5">
              <p>Location</p>
            </div>
            <div className="col-2">
              <p>:</p>
            </div>
            <div className="col-5">
              <p>Not Signed</p>
            </div>
            {/* Location */}
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center align-items-center mt-5">
        <AddLocationModal id={params.id} />
      </div>
    </div>
  );
};

export default Page;
