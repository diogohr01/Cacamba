import { Card, Col, Row } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-Photoroom.png';
import DynamicForm from '../../components/Form';
import { colors } from '../../styles/colors';
import { useAuth } from '../../hooks/auth';
import Loading from '../../components/Loading';

const SignIn = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: "admin", password: "Tekann.2024" });

  const submitForm = async (values) => {
    setLoading(true);
    var result = await signIn({
      username: values.username,
      password: values.password
    });

    if (result.data.response)
      navigate("/");
  };

  return (
    <Row
      gutter={[8, 8]}
      style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary }}
    >
      <Col span={6} style={{ textAlign: 'center' }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
          <img src={logo} alt="Logo" style={{ height: 50, }} />
          <span style={{ color: colors.white, fontSize: 33, fontWeight: "", marginLeft: 10 }}>
            <strong>My </strong>Task
          </span>
        </div>
        <Card
          title={<span style={{ color: 'white' , fontSize: '24px', marginTop: '12px'}}>Login</span>}
          bordered={false}
          style={{ backgroundColor: colors.cinzaTabela, color: 'white' }}
        >
          {loading ?
            <Loading /> :
            <DynamicForm
              formConfig={[
                {
                  columns: 1,
                  questions: [
                    { type: "text", id: "username", required: true, placeholder: "E-mail/usuário", label: "Digite seu login aqui" },
                    { type: "password", id: "password", required: true, placeholder: "Senha", label: "Digite aqui sua senha" },
                  ],
                }
              ]}
              values={form}
              setValues={setForm}
              onSubmit={submitForm}
              submitText='Login'
            />
          }
        </Card>
      </Col>
    </Row>
  );
};

export default SignIn;
