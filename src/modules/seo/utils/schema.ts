// Dynamic local schema and vehicle product schema helpers
export const generateLocalBusinessSchema = (branchData: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": branchData.branchName,
    "address": branchData.address,
  };
};
