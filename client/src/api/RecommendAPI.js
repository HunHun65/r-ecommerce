import { useState, useEffect } from "react";
import axios from "axios";

function RecommendAPI(token) {
  const [recommends, setRecommend] = useState([]);

  useEffect(() => {
    if (token) {
      const getRecommend = async () => {
        try {
          const res = await axios.get("/api/recommend", {
            headers: { Authorization: token },
          });
          setRecommend(res.data);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };

      getRecommend();
    }
  }, [token]);
  return {
    recommends: [recommends, setRecommend],
  };
}

export default RecommendAPI;
