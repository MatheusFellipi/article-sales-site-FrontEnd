import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { DashboardComponent } from "../../components/dashboard";
import { DashResponseProps } from "../../types/components/dashboard";


export default function Dashboard(dashboard: Readonly<DashResponseProps>) {
  return <DashboardComponent data={dashboard.data} />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["togdesign:token"]: token } = parseCookies(ctx);
  const responce = await fetch("http://localhost:3333/dashboard/", {
    method: "GET",
    headers: {
      authorization: "Bearer " + token,
    },
  });
  const data = await responce.json();
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      data,
    },
  };
};
