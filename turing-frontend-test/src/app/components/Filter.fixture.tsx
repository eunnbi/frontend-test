"use client";
import { useState } from "react";
import * as Filter from "./Filter";

const Story = () => {
	const [selected, setSelected] = useState("all");
	return (
		<Filter.Group title="필터" value={selected} onValueChange={setSelected}>
			<Filter.Item value="all">전체</Filter.Item>
			<Filter.Item value="with-payment">결제 내역 있는 SaaS</Filter.Item>
		</Filter.Group>
	);
};

export default Story;
