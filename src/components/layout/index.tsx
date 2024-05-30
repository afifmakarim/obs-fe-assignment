import { AppstoreOutlined, RobotOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

export default function LayoutPage() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const URL = {
    "1": "",
    "2": "about",
  };

  return (
    <Layout>
      <Sider className="min-h-screen" breakpoint="lg" collapsedWidth="0">
        <div className="flex justify-center">
          <h1 className="px-4 py-8 text-neutral-200 font-semibold text-xl">
            OBS Assignment
          </h1>
        </div>
        <Menu
          onClick={(e) => navigate("/" + URL[e.key as keyof typeof URL])}
          theme="dark"
          mode="inline"
          items={[
            {
              key: "1",
              icon: <AppstoreOutlined />,
              label: "Dashboard",
            },
            {
              key: "2",
              icon: <RobotOutlined />,
              label: "About",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}></Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 680,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          OBS Assignment ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
}
