import Header from "@/components/generic/Header";
import { render } from "@testing-library/react";

const renderComponent = ({ children }: { children: React.ReactNode }) => {
  return render(children);
};

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

describe("Components -> Header", () => {
  it("-> should render Header", () => {
    renderComponent({
      children: <Header />,
    });
  });
});
