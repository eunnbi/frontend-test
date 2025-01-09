import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SaasListItemStories, {
	결제내역_없는_SaaS,
	로고_결제내역_있는_SaaS,
	이름만_있는_SaaS,
} from "./SaasListItem.fixture";

describe("SaasListItem test", () => {
	it("이름만 있는 Saas", () => {
		render(SaasListItemStories["이름만 있는 SaaS"]);

		expect(
			screen.queryByRole("heading", { name: 이름만_있는_SaaS.name }),
		).toBeVisible();
		expect(screen.queryByText("결제")).toBeNull();
	});

	it("로고 결제내역 있는 SaaS", () => {
		render(SaasListItemStories["로고 결제내역 있는 SaaS"]);

		expect(
			screen.queryByRole("heading", { name: 로고_결제내역_있는_SaaS.name }),
		).toBeVisible();
		expect(screen.queryByText("2024년 6월 27일 결제")).toBeVisible();
	});

	it("항목은 해당 SaaS의 상세 페이지로 가는 링크이다.", () => {
		render(SaasListItemStories["결제내역 없는 SaaS"]);

		expect(
			screen.queryByRole("link", { name: 결제내역_없는_SaaS.name }),
		).toHaveAttribute("href", `/saas/${결제내역_없는_SaaS.id}`);
	});
});
