import { message } from "antd";
import { createContext, useContext } from "react";

export const MessageContext = createContext<
  ReturnType<typeof message.useMessage>[0] | null
>(null);

export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <MessageContext.Provider value={messageApi}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageApi = () => {
  const context = useContext(MessageContext);
  if (!context)
    throw new Error("useMessageApi deve ser usado dentro de MessageProvider");
  return context;
};
