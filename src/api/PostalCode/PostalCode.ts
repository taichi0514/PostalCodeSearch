
export async function getPostalCode(postalCode: string) {
  return await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`).then(response => response.json());
}