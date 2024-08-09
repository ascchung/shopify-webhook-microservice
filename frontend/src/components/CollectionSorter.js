import React, { useState, useEffect } from "react";
import { Card, Button, Select } from "@shopify/polaris";

const CollectionSorter = () => {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [sortCriteria, setSortCriteria] = useState("quantity");

  useEffect(() => {
    const fetchCollections = async () => {
      // Dummy data
      const data = [
        { id: "collection1", title: "Collection 1" },
        { id: "collection2", title: "Collection 2" },
      ];
      setCollections(data);
    };

    fetchCollections();
  }, []);

  const handleCollectionChange = (value) => setSelectedCollection(value);

  const handleSort = () => {
    console.log(`Sorting ${selectedCollection} by ${sortCriteria}`);
  };

  const options = collections.map((collection) => ({
    label: collection.title,
    value: collection.id,
  }));

  return (
    <Card sectioned>
      <Select
        label="Select a collection"
        options={options}
        onChange={handleCollectionChange}
        value={selectedCollection}
      />
      <Button onClick={handleSort}>Sort Collection</Button>
    </Card>
  );
};

export default CollectionSorter;
