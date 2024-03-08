
import Head from "next/head";

const Wrapper = ({ children }: any) => {
  // const {
  //   web3,
  //   frensly,
  //   address,
  //   user,
  //   setUser,
  //   needToChangeWallet,
  //   setNeedChangeWallet,
  //   setAuthSummaryCheck,
  //   init,
  //   setInit,
  // } = useInjection(Web3Store);

  // const isInit = async () => {
  //   // console.log(address, user?.account?.address);
  //   if (address?.toLowerCase() !== user?.account?.address) {
  //     setNeedChangeWallet(true);
  //   } else {
  //     setNeedChangeWallet(false);
  //   }
  //   if (user?.account?.isInitialized) {
  //     setInit(true);
  //   }
  // };
  // const ready = useMemo(
  //   () => !needToChangeWallet && init && user?.account,
  //   [needToChangeWallet, init, user?.account]
  // );

  // const router = useRouter();
  // useEffect(() => {
  //   if (ready) {
  //     setAuthSummaryCheck(true);
  //   } else if (needToChangeWallet) {
  //     setAuthSummaryCheck(false);
  //   } else {
  //     setAuthSummaryCheck(false);
  //   }
  // }, [ready]);
  // useEffect(() => {
  //   if (localStorage.getItem("auth") === "true") {
  //     router.push("/auth");
  //   }
  // }, []);
  // useEffect(() => {
  //   if (web3 && address && user?.account && frensly) {
  //     isInit();
  //     // getNotifications();
  //   }
  // }, [web3, address, user]);

  // const getUser = async () => {
  //   try {
  //     const res: AxiosRequestConfig = await axios.get(prefix + "user", {
  //       withCredentials: true,
  //     });
  //     setUser(res?.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // useEffect(() => {
  //   getUser();
  // }, []);
  return (
    <div
    >
      {/* {!needToChangeWallet && <Header />} */}
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      {/* {authorizeOpen && (
        <div className={home.main__page}>
          <AuthBanner />
        </div>
      )} */}
      {/* {needToChangeWallet && (
        <div className={style.change__account}>
          Address is not assigned to this account. Change to{" "}
          {user?.account.address}
          <div style={{ display: "none" }}>
            <ConnectButtonCustom />
          </div>
          <button
            className={header.connect__button}
            style={{ marginTop: "20px" }}
            onClick={async () => {
              try {
                const res = await axios.get("/api/v1/auth/logout");
                setTimeout(() => {
                  window.location.reload();
                }, 400);
              } catch (e) {
                console.log(e);
              }
            }}
          >
            Disconnect
          </button>
        </div>
      )}
            
      {!needToChangeWallet && children}
      {!needToChangeWallet && <Footer />} */}
      {/* <Header /> */}
      {children}
    </div>
  );
};
export default Wrapper;
