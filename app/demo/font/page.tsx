import React from 'react';

import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, ScrollArea } from '@/components/shadcn-ui';

import type { Metadata } from 'next';

import { PageHeader } from '@/components/custom-ui';

export const metadata: Metadata = {
	title: 'Font styles',
};

const Page = () => {
	return (
		<>
			<PageHeader>{metadata.title?.toString()}</PageHeader>
			<Accordion type="single" collapsible className="mx-auto w-11/12">
				<AccordionItem value="JalHaru">
					<AccordionTrigger>
						<h4 className="text-2xl">
							잘풀리는 하루<i className="text-base">JalHaru</i>
						</h4>
					</AccordionTrigger>
					<AccordionContent>
						<ScrollArea className="h-72 rounded-md border p-4 text-center text-xl font-[JalHaru]">
							<p className="text-balance mb-4">
								잘풀리는집 전용 서체는 잘풀리는집 로고를 바탕으로
								<br />
								깔끔하고 독특한 룩앤필을 재현하였으며 <br />
								가독성을 살리기 위해 모듈의 충분한 공간 활용을 적용하였습니다.
							</p>
							<p className="text-balance mb-4">
								제목이나 로고형으로 사용하기 좋은 <i className="text-primary">‘잘풀리는 오늘’</i>체와
								<br />
								본문형으로 사용하기 좋은 <i className="text-primary">‘잘풀리는 하루’</i>체<br />두 종류의 서체를 준비하였습니다.
							</p>
							<p className="text-balance mb-4">
								잘풀리는집 특유의 감성인 잘 풀릴 것 같은,
								<br />
								기분 좋은 느낌을 서체에 담고자 노력하였고 <br />
								잘풀리는집 서체를 사용하며 보고서나 리포트,
								<br />
								간판 외에도 무엇이든 다 잘 될 것 같은 <br />
								긍정의 마법에 걸려 승승장구 하시길 바랍니다.
							</p>
							<p className="text-balance mb-4">
								창립 20주년을 기념하여
								<br />
								고객님들께 받은 사랑에 보답하기 위해 준비한 작은 선물로
								<br />
								어느 곳에나 자유롭게 사용하실 수 있으며
								<br />
								잘풀리는집 서체를 사용하시는
								<br />
								모든 분이 바라는 것들이
								<br />
								조금이나마 잘 풀리길 응원합니다.
							</p>
						</ScrollArea>
						<div className="flex justify-center items-center gap-8 p-2">
							<Link href="https://noonnu.cc/font_page/498" target="_blank" className="text-primary hover:underline">
								Go to NoonNu Page
							</Link>
							<Link href="https://www.jjtissue.com/prcenter/prcenter_04.php" target="_blank" className="text-primary hover:underline">
								Go to Deploy Page
							</Link>
						</div>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="MoneygraphyRounded">
					<AccordionTrigger>
						<h4 className="text-2xl">
							머니그라피-라운디드<i className="text-base">MoneygraphyRounded</i>
						</h4>
					</AccordionTrigger>
					<AccordionContent>
						<ScrollArea className="h-72 rounded-md border p-4 text-center text-xl font-['MoneygraphyRounded']">
							<p className="text-balance mb-4">
								패션, 음악, 음식, 로컬, 테크, 여행, 스포츠. <br />
								우리가 사랑하는 모든 건 경제와 연결되어 있어요.
							</p>
							<p className="text-balance mb-4">
								토스의 콘텐츠 채널 ‘머니그라피’는 취향과 문화 이면의 경제 <br />
								이야기를 가장 쉽지만 깊고 유쾌하게 전달합니다. <br />
								아는 만큼 보인다고 하잖아요. 누구나 좋아하는 것 하나쯤에 푹 빠져, <br />
								일상을 밀도 있게 채우길 바라는 마음으로 콘텐츠를 만들어요.
							</p>
							<p className="text-balance mb-4">
								친근하고 유머러스한 머니그라피의 정체성을 담은 <br />
								머니그라피 서체를 소개합니다. <br />
							</p>
							<p className="text-balance mb-4">
								<i className="text-primary">‘Moneygraphy-Pixel’</i>, <i className="text-primary">‘MoneygraphyRounded’</i>
								<br />
								두 가지로 제작된 머니그라피 서체는 <br />
								누구나 무료로 자유롭게 사용할 수 있어요.
							</p>
						</ScrollArea>
						<div className="flex justify-center items-center gap-8 p-2">
							<Link href="https://noonnu.cc/en/font_page/1539" target="_blank" className="text-primary hover:underline">
								Go to NoonNu Page
							</Link>
							<Link href="https://toss.im/moneygraphy-font" target="_blank" className="text-primary hover:underline">
								Go to Deploy Page
							</Link>
						</div>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="OmyuPretty">
					<AccordionTrigger>
						<h4 className="text-2xl">
							오뮤 다예쁨체<i className="text-base">OmyuPretty</i>
						</h4>
					</AccordionTrigger>
					<AccordionContent>
						<ScrollArea className="h-72 rounded-md border p-4 text-center text-xl font-['OmyuPretty']">
							<p className="text-balance mb-4">
								Omyu Pretty.
								<br />
								미끌한 액정에 펜을 잡는게 어색한 분,
								<br />
								손글씨를 쓰기엔 효율이 더 중요한 당신을 위해.
								<br />
								무심한 듯 반듯한 오뮤 다예쁨체가 도움이 될 수 있길 바랍니다.
								<br />
							</p>
						</ScrollArea>
						<div className="flex justify-center items-center gap-8 p-2">
							<Link href="https://noonnu.cc/en/font_page/1136" target="_blank" className="text-primary hover:underline">
								Go to NoonNu Page
							</Link>
							<Link href="https://omyudiary.com/1510339180/?idx=28" target="_blank" className="text-primary hover:underline">
								Go to Deploy Page
							</Link>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</>
	);
};

export default Page;
