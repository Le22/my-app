import AdminPage from "@/app/admin/page";
import BasketPage from "@/app/basket/page";
import Home from "@/app/page";
import PaymentPage from "@/app/payment/page";
import TicketPage from "@/app/ticket/page";
import TicketingPage from "@/app/ticketing/page";
import MyClientQueryClientProvider from "@/provider/MyClientQueryClientProvider";
import { render } from "@testing-library/react";

const renderComponent = ({ children }: { children: React.ReactNode }) => {
  return render(
    <MyClientQueryClientProvider>{children}</MyClientQueryClientProvider>
  );
};

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQueryClient: () => ({
    // setQueryData: jest.fn(() => ({ data: [{ label: 'Blue', id: 34 }] })),
    // cancelQueries: jest.fn(),
    // invalidateQueries: jest.fn(),
    ...jest.requireActual("@tanstack/react-query").useQueryClient(),
    getQueryData: jest
      .fn()
      .mockReturnValueOnce({ data: [{ id: 1, quantity: 1 }] })
      .mockReturnValueOnce({ data: [{ id: 1, quantity: 2 }] }),
  }),
}));

/** New next/navigation mock */
jest.mock("next/navigation", () => {
  return {
    __esModule: true,
    usePathname: () => ({
      pathname: "",
    }),
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
    useSearchParams: () => ({
      get: () => {},
    }),
  };
});

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: "admin" },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" }; // return type is [] in v3 but changed to {} in v4
    }),
  };
});

describe("Pages", () => {
  it("-> should render home page", () => {
    renderComponent({
      children: <Home />,
    });
  });

  it("-> should render basket page", () => {
    renderComponent({
      children: <BasketPage />,
    });
  });

  it("-> should render payment page", () => {
    renderComponent({
      children: <PaymentPage />,
    });
  });

  it("-> should render ticket page", () => {
    renderComponent({
      children: <TicketPage />,
    });
  });

  it("-> should render ticketing page", () => {
    renderComponent({
      children: <TicketingPage />,
    });
  });

  it("-> should render admin page", () => {
    renderComponent({
      children: <AdminPage />,
    });
  });
});
