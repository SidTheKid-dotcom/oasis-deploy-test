// Component for the final community selection and share button

export default function Buttons({ communities, selectedCommunity, setSelectedCommunity, handleSubmit }) {

  // Set the selected community

  const handleChange = (event) => {
    const selectedCommunity = event.target.value;
    const [id, name] = selectedCommunity.split(',');

    const community = {
      community_id: id,
      community_name: name
    }

    setSelectedCommunity(community);
  };

  return (
    <section className="grid grid-cols-12 gap-3">
      {/* {
        selectedCommunity.community_id && selectedCommunity.community_name ? (
          <button type="submit" className="py-2 px-5 col-span-9 bg-[#323741] rounded-[5px]">Community: {selectedCommunity.community_name}</button>
        )
          : ( */}
            <select onChange={handleChange} className="p-2 col-span-9 bg-[#323741] rounded-[5px] text-center">
              <option>Select Community</option>
              {communities.map((community, index) => (
                <option key={index} value={`${community.id},${community.name}`}>{community.name}</option>
              ))}
            </select>
          {/* )
      } */}
      <button type="submit" onClick={handleSubmit} className="py-2 px-5 col-span-3 bg-[#323741] rounded-[5px]">Share</button>
    </section>
  )
}