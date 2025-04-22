
export const formatPhone = (value: string) => {
  if (!value) return "";

  // Remove all non-digit characters
  const numbers = value.replace(/\D/g, "");
  
  if (numbers.length <= 11) {
    // Format as (99) 99999-9999 or (99) 9999-9999
    return numbers
      .replace(/(\d{2})/, "($1) ")
      .replace(/(\d{4,5})/, "$1-")
      .replace(/(-\d{4})\d+?$/, "$1");
  }
  
  return value;
};
