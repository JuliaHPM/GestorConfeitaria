import 'react-toastify/dist/ReactToastify.css';
import { globalStyles } from "../styles/global"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "../styles/pages/App";
import Header from "../components/Header";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { queryClient } from '../lib/queryClient';
import Head from "next/head";
import { AuthProvider } from "../contexts/AuthContext";
import { ToastContainer } from "react-toastify";


globalStyles();

export default function App({ Component, pageProps }) {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>

        <Head>
          <link rel="shortcut icon" href="/cupcakeLogo.png" />
          <meta name="application-name" content="Mah Doces e Artes" />
        </Head>

        {/* <Container> */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Header />
          <Component {...pageProps} />
        </LocalizationProvider>
        {/* </Container> */}
        <ReactQueryDevtools />
      </QueryClientProvider >
      <ToastContainer />
    </AuthProvider>
  )
}
