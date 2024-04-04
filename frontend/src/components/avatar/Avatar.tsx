import { StyledAvatar, AvatarImage } from '../avatar/StyledAvartar.tsx'

interface AvatarProps {
  link?: string;
}

export const Avatar = ({ link }: AvatarProps) => {
  return (
    <>
    {/* 프로필 사진 */}
    <StyledAvatar>
      <AvatarImage src={link} alt="img" />
    </StyledAvatar>
    </>
  );
};
