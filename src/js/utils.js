export function getNextCheckboxId() {
  // Get all checkboxes in the list
  const checkboxes = document.querySelectorAll(".checkbox-list");
  let maxId = 0; // Start with 0 to find the highest existing ID

  // Loop through existing checkboxes to find the highest ID
  checkboxes.forEach((checkbox) => {
    const id = checkbox.id.split("_")[1]; // Get the numerical part
    const idNum = parseInt(id, 10); // Convert to integer
    if (idNum > maxId) {
      maxId = idNum; // Update maxId with the highest ID found
    }
  });

  // The next available ID is maxId + 1
  return maxId + 1;
}
