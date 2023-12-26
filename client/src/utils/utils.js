import axios from "axios";

export const connectToMetaMask = async () => {
  try {
    if (typeof window.ethereum !== "undefined") {
      // Kiểm tra xem có quyền truy cập ví hay không
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // Nếu có tài khoản, thông báo kết nối thành công
      if (accounts.length > 0) {
        const walletAddress = accounts[0];
        console.log(`Đã kết nối với ví MetaMask, địa chỉ ví: ${walletAddress}`);

        return walletAddress;
      } else {
        console.log("Ví MetaMask chưa được kết nối.");
        return null;
      }
    } else {
      console.log("Ví MetaMask không được hỗ trợ trong trình duyệt này.");
      return null;
    }
  } catch (error) {
    console.error("Lỗi khi kết nối đến MetaMask:", error);
    return null;
  }
};

export const getEth = async () => {
  try {
    const url =
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=vnd";

    const res = await axios.get(url);

    if (res && res.data) {
      return res.data;
    } else {
      throw new Error("Không có dữ liệu từ API");
    }
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    throw error; // Chuyển tiếp lỗi để xử lý ở phía gọi hàm
  }
};

export const convertETH = (priceEth, totalETH) => {
  const result = totalETH / priceEth;
  return result;
};
export const sendTransaction = async (total) => {
  console.log(total);
  const paymentAddress = "0xE76449ad74BDf0c905FA394e45F9deFC061ece64";
  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  const senderAddress = accounts[0];
  const Wei = 1000000000000000000;
  const params = [
    {
      from: senderAddress,
      to: paymentAddress,
      value: Number(total * Wei).toString(16),
      gasPrice: Number(10000000000).toString(16),
    },
  ];

  let relsult = await window.ethereum
    .request({ method: "eth_sendTransaction", params })
    .catch((err) => {
      console.log(err);
    });
};
