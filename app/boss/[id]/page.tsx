import CampaignBossBattle from "@/components/CampaignBossBattle";

export default function BossPage({ params }: { params: { id: string } }) {
  return <CampaignBossBattle bossId={params.id} />;
}
