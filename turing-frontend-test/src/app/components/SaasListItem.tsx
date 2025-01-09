import { css, cx } from "@styled-system/css";
import { hstack, square } from "@styled-system/patterns";
import Link from "next/link";

interface SassListItemProps {
	id: string;
	name: string;
	logoUrl: string | null;
	lastPaidAt: Date | null;
}

export const SaasListItem = ({
	id,
	name,
	logoUrl,
	lastPaidAt,
}: SassListItemProps) => {
	return (
		<li>
			<Link
				href={`/saas/${id}`}
				className={cx(
					hstack(),
					css({
						border: "1px solid transparent",
						borderRadius: "12px",
						padding: "16px",
						transition:
							"border-color .125s ease-in-out, background .125s ease-in-out",
						_currentPage: {
							borderColor: "#4e5867",
						},
					}),
				)}
			>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					className={square({ size: 24 })}
					src={logoUrl ?? SAAS_DEFAULT_IMAGE_URL}
					alt=""
					role="presentation"
				/>
				<h3>{name}</h3>
				{lastPaidAt && (
					<p
						className={css({
							fontSize: 13,
							color: "#4e5867",
						})}
					>
						{formatDate(lastPaidAt)} 결제
					</p>
				)}
			</Link>
		</li>
	);
};

const SAAS_DEFAULT_IMAGE_URL =
	"https://dev.smply.app/img/icon-logos/placeholder.png";

const formatDate = (date: Date) => {
	return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};
