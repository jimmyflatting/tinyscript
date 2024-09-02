import NeuralNetworkAnimation from "@/components/Home/NeuralNetworkAnimation";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen">
      {/* <NeuralNetworkAnimation /> */}
      <SignUp
        appearance={{
          variables: {
            colorTextOnPrimaryBackground: "#0f0f10",
            colorBackground: "#0f0f10",
            colorInputBackground: "#0f0f10",
            colorDanger: "#ff0000",
            colorPrimary: "#e7e7e4",
            colorInputText: "#e7e7e4",
            colorText: "#e7e7e4",
            colorTextSecondary: "#e7e7e4",
          },
          elements: {
            cardBox: "bg-slate-800 border border-primary/20",
            socialButtonsIconButton: "bg-primary hover:bg-primary/90",
            socialButtonsTextButton:
              "text-primary-foreground hover:text-primary/90",
            socialButtonsBlockButton:
              "bg-primary hover:bg-primary/90 text-primary-foreground",
            formButtonPrimary:
              "bg-primary hover:bg-primary/90 text-primary-foreground",
            footerActionLink: "text-slate-300 hover:text-white",
            footerBox: "bg-primary-foreground text-primary",
            formFieldInput: "bg-primary text-primary-foreground",
          },
        }}
      />
    </div>
  );
}
