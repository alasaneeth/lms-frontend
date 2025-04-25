import axiosInstance from "../../api/axiosInstance";

class StudentService {
  create = async (student: any) => {
    try {
      const res = await axiosInstance.post("student-register", student);
      return res.data.userId;
    } catch (e: any) {
      const { message } = e.response?.data || {};
      if (message?.errorInfo) throw message.errorInfo[2];
      throw e.message;
    }
  };

  edit = async (customer: any, code: string) => {
    try {
      await axiosInstance.put(`customer/${code}`, customer);
    } catch (e: any) {
      const { message } = e.response?.data || {};
      if (message?.errorInfo) throw message.errorInfo[2];
      throw e.message;
    }
  };

  get = async (id: string) => {
    try {
      const response = await axiosInstance.get(`students/${id}`);
      return response.data.student;
    } catch (e: any) {
      throw e.message;
    }
  };

  getAll = async () => {
    try {
      const response = await axiosInstance.get("get-all-students");
      return response.data;
    } catch (e: any) {
      throw e.response?.data?.message || e.message;
    }
  };

  search = async (keyword: string) => {
    try {
      const response = await axiosInstance.get(`gift-voucher-search/${keyword}`);
      return response.data.giftVocuher;
    } catch (e: any) {
      throw e.message;
    }
  };

  issuedVoucherSearch = async (keyword: string) => {
    try {
      const response = await axiosInstance.get(`issued-voucher-search/${keyword}`);
      return response.data.giftVocuher;
    } catch (e: any) {
      throw e.message;
    }
  };

  freeVoucherSearch = async (keyword: string) => {
    try {
      const response = await axiosInstance.get(`free-gift-voucher-search/${keyword}`);
      return response.data.giftVocuher;
    } catch (e: any) {
      throw e.message;
    }
  };

  paidVoucherSearch = async (keyword: string) => {
    try {
      const response = await axiosInstance.get(`paid-gift-voucher-search/${keyword}`);
      return response.data.giftVocuher;
    } catch (e: any) {
      throw e.message;
    }
  };

  sendSms = async (customer: any) => {
    try {
      const res = await axiosInstance.post("outstanding-sms", customer);
      return res.data;
    } catch (e: any) {
      const { message } = e.response?.data || {};
      if (message?.errorInfo) throw message.errorInfo[2];
      throw e.message;
    }
  };

  sendProductStatus = async (customer: any) => {
    try {
      const res = await axiosInstance.post("send-product-sms", customer);
      return res.data;
    } catch (e: any) {
      const { message } = e.response?.data || {};
      if (message?.errorInfo) throw message.errorInfo[2];
      throw e.message;
    }
  };
}

export default new StudentService();
