import { auth } from "@clerk/nextjs/server";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

interface InviteCodePageProps {
  params: Promise<{
    inviteCode: string;
  }>;
}

const InviteCodePage = async (props: InviteCodePageProps) => {
  const params = await props.params;
  const profile = await currentProfile();
  const { redirectToSignIn } = await auth();

  if (!profile) {
    return redirectToSignIn();
  }

  if (!params.inviteCode) {
    return redirect("/");
  }

  // 判断邀请码对应的服务器是否存在且用户是否已经在当前服务器
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          }
        ]
      }
    }
  })

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return null;
}
 
export default InviteCodePage;