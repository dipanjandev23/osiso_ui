import loadable from "loadable-components";
import Loading from './loading';

export const SignUp = loadable(() => import("../pages/Auth/SignUp"),{
    LoadingComponent: Loading
});
export const Login = loadable(() => import("../pages/Auth/login"),{
    LoadingComponent: Loading
});
export const ForgotPass = loadable(() => import("../pages/Auth/forgetPass"),{
    LoadingComponent: Loading
});

export const ResetPass = loadable(() => import("../pages/Auth/resetPass"),{
    LoadingComponent: Loading
});
export const Auth = loadable(() => import("../pages/Auth"),{
    LoadingComponent: Loading
});
export const Home = loadable(() => import("../pages/Home"),{
    LoadingComponent: Loading
});
export const Delivery = loadable(() => import("../pages/Delivery"),{
    LoadingComponent: Loading
});
export const ScheduleDelivery = loadable(() => import("../pages/ScheduleDelivery"),{
    LoadingComponent: Loading
});
export const Tracking = loadable(() => import("../pages/Tracking"),{
    LoadingComponent: Loading
});
export const Dashboard = loadable(()=> import("../pages/Dashboard"),{
    LoadingComponent: Loading
});
export const Contact  = loadable(()=> import("../pages/Contact"),{
    LoadingComponent: Loading
});
export const Support  = loadable(()=> import("../pages/Support"),{
    LoadingComponent: Loading
});
export const SupportList  = loadable(()=> import("../pages/SupportList"),{
    LoadingComponent: Loading
});
export const TermsCondition  = loadable(()=> import("../pages/TC"),{
    LoadingComponent: Loading
});
export const Privacy  = loadable(()=> import("../pages/PP"),{
    LoadingComponent: Loading
});