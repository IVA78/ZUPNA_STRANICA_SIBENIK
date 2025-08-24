import { useEffect, useState } from "react";
import { Select, Box } from "@chakra-ui/react";

export default function FilterKategorija({ onFilterChange }) {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Greška kod dohvaćanja kategorija", err);
      }
    }
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    onFilterChange(value); // javi parent komponenti
  };

  return (
    <Box mb={4}>
      <Select
        placeholder="Filtriraj obavijesti po kategoriji"
        value={selected}
        onChange={handleChange}
      >
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </Select>
    </Box>
  );
}
