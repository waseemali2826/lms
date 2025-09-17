export type CourseType = "free" | "paid";

export interface OptimizedImageData {
  src: string;
  filename: string;
  title: string;
  type: CourseType;
  id: string;
}

export const courses10: OptimizedImageData[] = [
  {
    id: "advance-python",
    title: "Advance Python",
    filename: "advance-python",
    type: "free",
    src: "/placeholder.svg",
  },
  {
    id: "cloud-computing-aws-azure",
    title: "Cloud Computing (AWS)",
    filename: "cloud computing (aws)",
    type: "free",
    src: "/placeholder.svg",
  },
  {
    id: "cloud-computing-microsoft",
    title: "Cloud Computing (Microsoft)",
    filename: "cloud computing microsoft",
    type: "free",
    src: "/placeholder.svg",
  },
  {
    id: "cyber-security-ceh-chfi",
    title: "Cyber Security (CEH, CHFI)",
    filename: "cyber security",
    type: "free",
    src: "/placeholder.svg",
  },
  {
    id: "full-stack-web-development-free",
    title: "Full Stack Web Development",
    filename: "full stack web development",
    type: "free",
    src: "/placeholder.svg",
  },
  {
    id: "google-ux-design",
    title: "Google UX Design",
    filename: "google-ux-design",
    type: "free",
    src: "/placeholder.svg",
  },
  {
    id: "aws-cloud-computing",
    title: "AWS Cloud Computing",
    filename: "aws-cloud computing",
    type: "paid",
    src: "/placeholder.svg",
  },
  {
    id: "graphic-designing",
    title: "Graphic Designing",
    filename: "graphic-designing",
    type: "paid",
    src: "/placeholder.svg",
  },
  {
    id: "video-editing",
    title: "Video Editing",
    filename: "video-editing",
    type: "paid",
    src: "/placeholder.svg",
  },
  {
    id: "full-stack-development",
    title: "Full Stack Development",
    filename: "web-development",
    type: "paid",
    src: "/placeholder.svg",
  },
];

export const imageMap = new Map(courses10.map((img) => [img.id, img]));
