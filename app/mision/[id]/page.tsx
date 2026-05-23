import MissionRunner from "@/components/MissionRunner";

export default function MissionPage({ params }: { params: { id: string } }) {
  return <MissionRunner missionId={params.id} />;
}
