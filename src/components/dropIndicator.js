const DropIndicator = ({ beforeId, status }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-status={status}
      className='my-0.5 h-0.5 w-full bg-black/50 '
    />
  );
};
export default DropIndicator;
