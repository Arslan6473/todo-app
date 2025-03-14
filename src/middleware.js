import { auth } from "@/lib/auth";

export default async function handler(req, res) {
  return auth(req, res);
}

export const config = {
  runtime: "nodejs", 
};
