import React, { useState } from "react";
import styled from "@emotion/styled";
import { Formik, Field, Form, useFormik, FormikProps } from "formik";
import * as yup from "yup";

const StyledInput = styled.input`
  padding: 10px 24px;
  width: auto;
  height: 24px;
  background: #ffffff;
  border: 1px solid #dedede;
  border-radius: 10px;
  &::placeholder {
    color: #dedede;
  }
`;
const StyledLabel = styled.label`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;

  /* Black&white/700 */

  color: #636363;
`;

const UserInfoBox = styled.section`
  display: flex;
  flex-direction: column;
`;
type Values = {
  account: string;
  password: string;
};

const UserInfo = () => {
  return (
    <>
      <Formik
        initialValues={{ account: "", password: "" }}
        onSubmit={(value: Values) => alert(value)}
        validationSchema={yup.object({
          account: yup
            .string()
            .max(21, "請勿輸入超過21碼的英文或數字")
            .required("Required"),
        })}
      >
        {(props: FormikProps<any>) => {
          return (
            <Form>
              <label htmlFor="account">帳號</label>
              <Field name="account" placeholder="4-21碼小寫英文.數字" />
              <label htmlFor="password">密碼</label>
              <Field name="password" placeholder="6-18位數密碼,請區分大小寫" />
              <button type="submit">送出</button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default UserInfo;
