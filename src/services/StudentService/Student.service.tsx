

import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL;

class Student {
  create = async (voucher: any) => {
    const res = await axios.post<any>(`${API_URL}gift-voucher`, voucher)
      .catch((e) => {
        const { message } = e.response.data;
        if (message.errorInfo) throw message.errorInfo[2];
        else throw e.message;
      });
    return res.data.vouchers;
  };

  edit = async (customer: any, code: any) => {
    await axios.put(`${API_URL}customer/${code}`, customer)
      .catch((e) => {
        const { message } = e.response.data;
        if (message.errorInfo) throw message.errorInfo[2];
        else throw e.message;
      });
  };

  get = async (code: any) => {
    const response = await axios.get<any>(`${API_URL}customer/${code}`)
      .catch((e) => {
        throw e.message;
      });
    return response.data.customer;
  };

  getAll = async () => {
    const response = await axios.get<any>(`${API_URL}get-all-students`)
      .catch((e) => {
        throw e.message;
      });
    return response.data;
  };

  search = async (keyword: any) => {
    const response = await axios.get<any>(`${API_URL}gift-voucher-search/${keyword}`)
      .catch((e) => {
        throw e.message;
      });
    return response.data.giftVocuher;
  };

  issuedVocuherSearch = async (keyword: any) => {
    const response = await axios.get<any>(`${API_URL}issued-voucher-search/${keyword}`)
      .catch((e) => {
        throw e.message;
      });
    return response.data.giftVocuher;
  };


  freeVocuherSearch = async (keyword: any) => {
    const response = await axios.get<any>(`${API_URL}free-gift-voucher-search/${keyword}`)
      .catch((e) => {
        throw e.message;
      });
    return response.data.giftVocuher;
  };

  paidVocuherSearch = async (keyword: any) => {
    const response = await axios.get<any>(`${API_URL}paid-gift-voucher-search/${keyword}`)
      .catch((e) => {
        throw e.message;
      });
    return response.data.giftVocuher;
  };

  sendSms = async (customer: any) => {
    const res = await axios({
      method: "post",
      url: `${API_URL}outstanding-sms`,
      data: customer,
    }).catch((e) => {
      const { message } = e.response.data;
      if (message.errorInfo) throw message.errorInfo[2];
      else throw e.message;
    });
    return res.data;
  };

  sendproductStatus = async (customer: any) => {
    const res = await axios({
      method: "post",
      url: `${API_URL}send-product-sms`,
      data: customer,
    }).catch((e) => {
      const { message } = e.response.data;
      if (message.errorInfo) throw message.errorInfo[2];
      else throw e.message;
    });
    return res.data;
  };

}
export default new Student();
