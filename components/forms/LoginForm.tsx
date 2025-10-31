import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import type { SVGProps } from "react";

const GitHub = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 1024 1024" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
      transform="scale(64)"
      fill="#ffff"
    />
  </svg>
);


const Google = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fill="#EA4335"
      d="M12 11.999h10.5c.15.8.25 1.65.25 2.5 0 5.5-3.67 9.5-10.75 9.5C5.67 24 0 18.627 0 12S5.67 0 12 0c3.24 0 5.95 1.18 7.92 3.13l-3.33 3.33C15.22 5.47 13.76 5 12 5c-3.95 0-7.16 3.22-7.16 7.19 0 3.97 3.21 7.19 7.16 7.19 3.55 0 5.93-2.03 6.45-4.84H12v-2.56Z"
    />
  </svg>
);




export  function LoginForm(){
    return(
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">
                        Welcome Back
                    </CardTitle>
                    <CardDescription>
                        Login with you google or github Acc
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <form>
                            <Button className="w-full cursor-pointer" variant="outline">
                               <GitHub className="size-4"/>
                                Login with Github
                            </Button>
                        </form>
                        <form>
                            <Button className="w-full" variant="outline">
                              <Google className="size-4"/>
                                Login with Google
                            </Button>
                        </form>
                    </div>
                </CardContent>
            </Card>
            <div className="text-center text-xs text-muted-foreground">By clicking continou, you agree to our terms and service and privacy policy.</div>
        </div>
    )
}