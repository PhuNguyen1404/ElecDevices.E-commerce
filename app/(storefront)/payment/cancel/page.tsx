import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function CancelPayment() {
  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <XCircle className="w-12 h-12 text-red-500 rounded-full bg-red-500/30 p-2" />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className="text-lg font-semibold leading-6">
              Payment Cancelled!
            </h3>
            <Button asChild className="w-full mt-5 sm:mt-6">
              <Link href={"/"}> Back to Homepage</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
