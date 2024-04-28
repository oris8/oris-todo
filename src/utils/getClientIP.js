export default async function getClientIP() {
  try {
    const response = await fetch("https://geolocation-db.com/json/");
    if (!response.ok) {
      throw new Error("Failed to fetch IP address");
    }
    const data = await response.json();
    return data.IPv4; // 클라이언트의 IPv4 주소 반환
  } catch (error) {
    console.error("Error fetching IP address:", error.message);
    return null; // 오류 발생 시 null 반환
  }
}
