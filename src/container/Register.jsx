import { useState } from "react";

const Register = () => {
  let [] = useState();
  return (
    <section>
      <h3>會員註冊</h3>
      {/* 步驟燈 */}
      <div>
        <div className="current_step step">1</div>
        <div>2</div>
        <div>3</div>
      </div>
      {/* 根據步驟切換內容 */}
    </section>
  );
};

export default Register;
