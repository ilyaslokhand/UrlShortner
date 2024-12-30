import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { urlstate } from "@/Context/Context";
import { logout } from "@/DB/ApiAuth";
import UseFetch from "@/Hook/UseFetch";
import { LinkIcon, LogOut } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Header = () => {
  const navigate = useNavigate();
  const { userdata, userfn } = urlstate();
  const { loading, fn: fnlogout } = UseFetch(logout);

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to={"/"}>
          <img src="/logo.png" alt="banner" className="h-16" />
        </Link>
        <div>
          {!userdata ? (
            <Button onClick={() => navigate("/auth")}>Login</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage
                    src={userdata?.user_metadata?.profile_pic}
                  ></AvatarImage>
                  <AvatarFallback>PA</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {userdata?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <LinkIcon className="mr-2 h-4 w-4" />
                  My Links
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span
                    onClick={() => {
                      fnlogout().then(() => {
                        userfn();
                        navigate("/auth");
                      });
                    }}
                  >
                    Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
    </>
  );
};

export default Header;
