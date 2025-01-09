import { describe, it, expect } from "vitest";

import SaasListStories from "./SaasList.fixture";
import { render, screen } from "@testing-library/react";

describe("SaasList test", () => {
	it("SaaS가 없으면, 연동하세요 링크를 보여준다.", () => {
		render(SaasListStories["Saas가 없음"]);

		expect(screen.getByRole("link", { name: "연동하세요" })).toHaveAttribute(
			"href",
			"/connect",
		);
	});

	// 정렬 및 필터를 같이 검증함.
	it("결제 내역 있는 SaaS를 필터할 수 있다.", () => {
		render(SaasListStories["Saas가 여럿 있음"]);

		// given 전체 SaaS 필터 체크됨
		expect(screen.getByRole("radio", { name: "전체 5" })).toBeChecked();
		expect(screen.getByRole("list", { name: "SaaS 목록" })).toBeVisible();

		// given 5개의 항목이 최근 결제일 순으로 정렬됨
		const expectedTextContents = [
			"Notion2024년 6월 27일 결제",
			"Asana2024년 6월 20일 결제",
			"GitHub2024년 6월 15일 결제",
			"Slack",
			"Zoom",
		];
		let items = screen.getAllByRole("listitem");
		expect(items).toHaveLength(5);
		items.forEach((elem, index) => {
			expect(elem).toHaveTextContent(expectedTextContents[index]);
		});

		// when "결제 내역 있는 SaaS" 라디오를 클릭하면
		screen.getByRole("radio", { name: "결제 내역 있는 SaaS 3" }).click();

		// then 결제 내역 있는 SaaS만 필터링됨
		items = screen.getAllByRole("listitem");
		expect(items).toHaveLength(3);
		items.forEach((elem, index) => {
			expect(elem).toHaveTextContent(expectedTextContents[index]);
		});
	});
});
