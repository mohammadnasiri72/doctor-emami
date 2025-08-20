import CardRelative from './CardRelative';

export default function BoxRelative({ setIsLoading, PatientRelative, setIsOpenAddRelative, setEditRelative, setFlag }) {
  return (
    <>
      <div className="flex flex-wrap">
        {PatientRelative.map((rel) => (
          <div className="w-1/2 px-1 mt-2" key={rel.patientRelativeId}>
            <CardRelative
              title={rel.relative}
              fullName={rel.fullName}
              mobile={rel.mobileNumber}
              desc={rel.description}
              address={rel.address}
              rel={rel}
              setIsLoading={setIsLoading}
              setIsOpenAddRelative={setIsOpenAddRelative}
              setEditRelative={setEditRelative}
              setFlag={setFlag}
            />
          </div>
        ))}
      </div>
    </>
  );
}
