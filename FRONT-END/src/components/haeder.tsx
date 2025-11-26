import { Button } from "antd";
import { useAuth } from "../lib/auth-context";
import { useNavigate } from "react-router";

export function Header() {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  return (
    <div className="flex justify-end items-center p-4 bg-gray-900 text-white">
      {isAuthenticated && (
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => navigate("/user/posts/papers")}
          size="middle"
          style={{ fontWeight: "600" }}
        >
          Meus Papers
        </Button>
      )}
    </div>
  );
}
