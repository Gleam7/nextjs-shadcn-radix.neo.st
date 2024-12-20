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
							잘풀리는 하루<i className="text-base ml-2">JalHaru, Created by Jaepulrineun Jip</i>
						</h4>
					</AccordionTrigger>
					<AccordionContent>
						<ScrollArea className="h-72 rounded-md border p-4 text-center text-xl font-[JalHaru]">
							<p className="text-balance">
								잘풀리는집 전용 서체는 잘풀리는집 로고를 바탕으로
								<br />
								깔끔하고 독특한 룩앤필을 재현하였으며 <br />
								가독성을 살리기 위해 모듈의 충분한 공간 활용을 적용하였습니다.
							</p>
							<p className="text-balance">
								제목이나 로고형으로 사용하기 좋은 <i className="text-primary">‘잘풀리는 오늘’</i>체와
								<br />
								본문형으로 사용하기 좋은 <i className="text-primary">‘잘풀리는 하루’</i>체<br />두 종류의 서체를 준비하였습니다.
							</p>
							<p className="text-balance">
								잘풀리는집 특유의 감성인 잘 풀릴 것 같은,
								<br />
								기분 좋은 느낌을 서체에 담고자 노력하였고 <br />
								잘풀리는집 서체를 사용하며 보고서나 리포트,
								<br />
								간판 외에도 무엇이든 다 잘 될 것 같은 <br />
								긍정의 마법에 걸려 승승장구 하시길 바랍니다.
							</p>
							<p className="text-balance">
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
							<h5 className="text-balance font-bold text-2xl text-left mt-7">License text</h5>
							<p className="text-balance text-left">
								The intellectual property rights of the &quot;Jalpulrineun Jib&quot; font (Jalpulrineun Oneul, Jalpulrineun Haru) are
								owned by Jalpulrineun Jib.
								<br />
								The &quot;Jalpulrineun Jib&quot; font is free for all users, including individual and corporate users, and can be used
								freely for commercial purposes, such as print media, advertising, and online.
								<br />
								However, selling the font itself for a fee is prohibited, and the &quot;Jalpulrineun Jib&quot; font cannot be modified or
								redistributed. It must be used in its original form.
								<br />
								Images of printed materials, advertisements (online/offline), products, etc., that use the &quot;Jalpulrineun Jib&quot;
								font may be used for Jalpulrineun Jib marketing. Users who do not want this can contact us at any time.
								<br />
								Inquiries: www.jjtissue.com / zalzip@naver.com
							</p>
						</ScrollArea>
						<div className="flex justify-center items-center gap-8 p-2">
							<Link
								href="https://noonnu.cc/font_page/498"
								title="Go to NoonNu page"
								target="_blank"
								className="text-primary hover:underline"
							>
								Go to NoonNu Page
							</Link>
							<Link
								href="https://www.jjtissue.com/prcenter/prcenter_04.php"
								title="Go to Download page"
								target="_blank"
								className="text-primary hover:underline"
							>
								Go to Download page
							</Link>
						</div>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="MoneygraphyRounded">
					<AccordionTrigger>
						<h4 className="text-2xl">
							머니그라피-라운디드<i className="text-base ml-2">MoneygraphyRounded, Created by Viva Republica Inc.</i>
						</h4>
					</AccordionTrigger>
					<AccordionContent>
						<ScrollArea className="h-72 rounded-md border p-4 text-center text-xl font-['MoneygraphyRounded']">
							<p className="text-balance">
								패션, 음악, 음식, 로컬, 테크, 여행, 스포츠. <br />
								우리가 사랑하는 모든 건 경제와 연결되어 있어요.
							</p>
							<p className="text-balance">
								토스의 콘텐츠 채널 ‘머니그라피’는 취향과 문화 이면의 경제 <br />
								이야기를 가장 쉽지만 깊고 유쾌하게 전달합니다. <br />
								아는 만큼 보인다고 하잖아요. 누구나 좋아하는 것 하나쯤에 푹 빠져, <br />
								일상을 밀도 있게 채우길 바라는 마음으로 콘텐츠를 만들어요.
							</p>
							<p className="text-balance">
								친근하고 유머러스한 머니그라피의 정체성을 담은 <br />
								머니그라피 서체를 소개합니다. <br />
							</p>
							<p className="text-balance">
								<i className="text-primary">‘Moneygraphy-Pixel’</i>, <i className="text-primary">‘MoneygraphyRounded’</i>
								<br />
								두 가지로 제작된 머니그라피 서체는 <br />
								누구나 무료로 자유롭게 사용할 수 있어요.
							</p>
							<h5 className="text-balance font-bold text-2xl text-left mt-7">License text</h5>
							<p className="text-balance text-left">
								The Moneygraphy font is free for use by both individuals and businesses. However, all rights, including copyright, to the
								Moneygraphy font are owned by Viva Republica, Inc. and the font may not be modified or redistributed.
							</p>
						</ScrollArea>
						<div className="flex justify-center items-center gap-8 p-2">
							<Link
								href="https://noonnu.cc/en/font_page/1539"
								title="Go to NoonNu page"
								target="_blank"
								className="text-primary hover:underline"
							>
								Go to NoonNu Page
							</Link>
							<Link
								href="https://toss.im/moneygraphy-font"
								title="Go to Download page"
								target="_blank"
								className="text-primary hover:underline"
							>
								Go to Download Page
							</Link>
						</div>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="OmyuPretty">
					<AccordionTrigger>
						<h4 className="text-2xl">
							오뮤 다예쁨체<i className="text-base ml-2">OmyuPretty, Created by OmuDiary x VoyagerX</i>
						</h4>
					</AccordionTrigger>
					<AccordionContent>
						<ScrollArea className="h-72 rounded-md border p-4 text-center text-xl font-['OmyuPretty']">
							<p className="text-balance">
								Omyu Pretty.
								<br />
								미끌한 액정에 펜을 잡는게 어색한 분,
								<br />
								손글씨를 쓰기엔 효율이 더 중요한 당신을 위해.
								<br />
								무심한 듯 반듯한 오뮤 다예쁨체가 도움이 될 수 있길 바랍니다.
								<br />
							</p>
							<h5 className="text-balance font-bold text-2xl text-left mt-7">License text</h5>
							<p className="text-balance text-left">
								[License Text]
								<br />
								1. The intellectual property rights of the exclusive font distributed through the Omudiary homepage belong to Omudiary
								and Voyager X.
								<br />
								2. Omu Dayeppum font is provided free of charge to all users, including individuals and corporations.
								<br />
								3. Omu Dayeppum font cannot be used for commercial purposes such as resale or redistribution without separate permission
								for any reason, and must be used as distributed without modification of the font.
								<br />
								4. [Scope of Use]
								<br /> Printing: Brochures, posters, books, magazines and printed materials for publication, etc.
								<br /> Website: Web pages, banners, mail, E-brochures, etc.
								<br /> Video: Video subtitles, thumbnails, Instagram promotional materials, etc.
								<br /> Sales: Product packaging, emoticons, digital creations, etc. (However, sales of handwritten products are
								prohibited)
								<br /> Embedding: Font loading within website and program servers
								<br /> BI/CI: Company name, brand name, product name, logo, mark, slogan, etc.
								<br />
								5. Images of printed materials and advertisements using the Omu Dayeppum font may be used for Omudiary promotions. If you
								do not wish this, you can request it at any time.
							</p>
						</ScrollArea>
						<div className="flex justify-center items-center gap-8 p-2">
							<Link
								href="https://noonnu.cc/en/font_page/1136"
								title="Go to NoonNu page"
								target="_blank"
								className="text-primary hover:underline"
							>
								Go to NoonNu Page
							</Link>
							<Link
								href="https://omyudiary.com/1510339180/?idx=28"
								title="Go to Download page"
								target="_blank"
								className="text-primary hover:underline"
							>
								Go to Download page
							</Link>
						</div>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="SejongGeulggot">
					<AccordionTrigger>
						<h4 className="text-2xl">
							세종글꽃체<i className="text-base ml-2">Sejong Geulggot, Created by Sejong Special Self-Governing City</i>
						</h4>
					</AccordionTrigger>
					<AccordionContent>
						<ScrollArea className="h-72 rounded-md border p-4 text-center text-xl font-['SejongGeulggot']">
							<p className="text-balance">
								세종글꽃체란?
								<br />
								‘시민’교사의 문해교육을 통해 ‘시민’의 손끝에서 꽃피운 서체를 나눕니다.
								<br />
								‘세종글꽃체’는 세종시문해교육센터의 ‘세종글꽃서당’ 성인 문해교육 학습자 ‘홍죽표’ 어르신의 손글씨를 바탕으로 만들어진
								서체(폰트)입니다.
								<br />
								한글 11,172자, 영문 94자(Basic Latin), 특수문자 986자(KS 심볼), 세종시 상징물 특수문자(캐릭터, CI) 21자를 지원합니다.
							</p>
							<h5 className="text-balance font-bold text-2xl text-left mt-7">License text</h5>
							<p className="text-balance text-left">
								Copyright
								<br />
								The intellectual property rights of Sejong Gulkkoch belong to the Sejong Special Self-Governing City, and you can use it
								for free under Article 24-2 (Free Use of Public Works) of the Copyright Act and the &quot;Guidelines for Management and
								Use of Public Works Copyright&quot; issued by the Ministry of Culture, Sports and Tourism.
								<br />
								However, any commercial acts such as transferring or selling Sejong Gulkkoch for a fee are prohibited, and any
								modification acts such as redistribution after modification are also prohibited.
								<br />※ Source Indication
								<br />
								When using the typeface for creations such as printed and published materials, guide signs, websites (homepage), blogs,
								etc., please indicate the copyright holder and use it.
								<br />
								Example) This post was created using Sejong Gulkkoch.
							</p>
						</ScrollArea>
						<div className="flex justify-center items-center gap-8 p-2">
							<Link
								href="https://noonnu.cc/en/font_page/1523"
								title="Go to NoonNu Page"
								target="_blank"
								className="text-primary hover:underline"
							>
								Go to NoonNu Page
							</Link>
							<Link
								href="https://www.sejong.go.kr/kor/sub01_0306.do"
								title="Go to Download page"
								target="_blank"
								className="text-primary hover:underline"
							>
								Go to Download page
							</Link>
						</div>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="SUIT">
					<AccordionTrigger>
						<h4 className="text-2xl">
							수트<i className="text-base ml-2">Suit, Created by SUNN YOUN</i>
						</h4>
					</AccordionTrigger>
					<AccordionContent>
						<ScrollArea className="h-72 rounded-md border p-4 text-center text-xl font-['SUIT']">
							<p className="text-balance">
								사용자 환경에 영향받지 않는 일관된 시각적 경험을 제공하기 위해 많은 Product에서 본고딕―Noto Sans를 선택합니다.
								<br />
								하지만 한글과 어울리지 않는 Grotesque 계열의 영문자와 숫자, 어긋나 있는 중앙 정렬, 넓은 자간 같은 문제들이 있습니다.
								<br />
								<br />
								디자이너는 완성도를 위해 많은 노력을 기울이지만 개발자와의 언어 차이, 인력과 시간 부족 등 다양한 요인에 의해 그 노력을
								온전히 반영하는 과정은 쉽지 않습니다.
								<br />
								<br />
								SUIT―수트는 반복되는 노력을 기울이지 않아도 완성도 높은 형태를 유지하며, 소모적인 Communication도 줄일 수 있도록 제작한
								UI 폰트입니다.
							</p>
							<h5 className="text-balance font-bold text-2xl text-left mt-7">License text</h5>
							<p className="text-balance text-left">
								SUIT is open source. You can use, modify, and redistribute it freely under the SIL Open Font License.
							</p>
							<p className="text-balance text-left">The Korean glyphs are based on **Bongodik**.</p>
						</ScrollArea>
						<div className="flex justify-center items-center gap-8 p-2">
							<Link
								href="https://noonnu.cc/en/font_page/845"
								title="Go to NoonNu Page"
								target="_blank"
								className="text-primary hover:underline"
							>
								Go to NoonNu Page
							</Link>
							<Link href="https://sun.fo/suit/" title="Go to Download page" target="_blank" className="text-primary hover:underline">
								Go to Download page
							</Link>
						</div>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="D2Coding">
					<AccordionTrigger>
						<h4 className="text-2xl">
							D2Coding<i className="text-base ml-2">D2 Coding, Created by Naver</i>
						</h4>
					</AccordionTrigger>
					<AccordionContent>
						<ScrollArea className="h-72 rounded-md border p-4 text-center text-xl font-['D2Coding']">
							<p className="text-balance">
								SW개발에 최적화된 개발 전용 폰트, &apos;D2Coding&apos; 1.3 버전을 릴리즈 합니다.
								<br />
								<br />
								<br />
								그동안 여러 개발자 분들의 요구사항과 베타 테스트를 통한 피드백을 거쳐 오늘에서야 릴리스하게 되었습니다.
								<br />
								<br />
								기존 1.2 버전에서 개선된 점은 크게 다음과 같습니다.
								<br />
								<br />
								문자열 가독성 개선: ㅂ받침, 따옴표, 알파벳 일부 문자의 가독성을 개선하였습니다.
								<br />
								powerline 심볼 추가: 쉘환경을 더욱 예쁘게 사용하실 수 있도록 powerline 심볼을 추가하였습니다.
								<br />
								ligature 문자 지원: 코딩에 사용되는 특수 문자들인 ligature 문자들을 지원합니다.
								<br />
								다양한 OS 및 개발도구 지원: Windows, Mac, Linux(Ubuntu) 상의 다양한 개발도구에서도 사용하실 수 있습니다.
								<br />
								D2Coding 1.3은 아래 경로에서 다운로드하실 수 있습니다.
								<br />
								<br />
								다운로드:
								<Link
									href="https://github.com/naver/d2codingfont/releases"
									title="Go to release page on GitHub"
									target="_blank"
									className="text-primary hover:underline"
								>
									https://github.com/naver/d2codingfont/releases
								</Link>
								<br />
								버전: 1.3
								<br />
								출시일: 2017년 11월 29일
								<br />
								상세 개선 내용은 아래와 같습니다.
								<br />
								<br />
								1. 일부 문자열의 가독성 개선
								<br />
								&apos;ㅂ&apos;받침 가독성 개선: &apos;ㅁ&apos;받침과 &apos;ㅂ&apos;받침이 폰트 크기와 상관없이 가독성이 떨어지는 이슈
								해결
								<br />
								홑따옴표와 겹따옴표 가독성 개선: 홑따옴표와 곁따옴표의 글자모명이 비슷해 구분이 어려운 문제 해결
								<br />
								알파벳 문자 b, d, h 가독성 개선: b, d, h의 윗선이 너무 짧아, o 나 n으로 보이는 이슈 해결
								<br />
								2. powerline 심볼 추가
								<br />
								<br />
								<br />
								3. ligature 문자 지원
								<br />
								<br />
								<br />
								4. 기타
								<br />
								일부 개발도구에서 폰트가 표시가 안되는 문제를 해결하여 아래의 OS와 개발도구에서 D2Coding 폰트를 사용하실 수 있습니다.
							</p>
							<h5 className="text-balance font-bold text-2xl text-left mt-7">License text</h5>
							<p className="text-balance text-left">
								The intellectual property rights of Naver Nanum fonts belong to Naver and the Naver Culture Foundation.
								<br />
								Naver Nanum fonts are available for free to all users, including individual and corporate users, and you are free to
								modify and redistribute them.
								<br />
								However, selling the font itself for a fee is prohibited. Naver Nanum fonts can be bundled, redistributed, or sold with
								other software as long as this copyright notice and license terms are included.
								<br />
								If it is difficult to include the Naver Nanum font license terms, we recommend citing the source of the Nanum font.
								<br />
								For example: This page uses Nanum fonts provided by Naver.
								<br />
								Images of printed materials and advertisements (including online) that use Naver Nanum fonts can be used for Nanum font
								promotion.
								<br />
								Users who do not want this can request it at any time.
								<br />
								For detailed usage conditions, please refer to the Naver Nanum font license terms below.
								<br />
								View license terms:
								<Link
									href="https://help.naver.com/support/contents/contents.nhn?serviceNo=1074&categoryNo=3497"
									title="View license terms"
									target="_blank"
									className="text-primary hover:underline"
								>
									https://help.naver.com/support/contents/contents.nhn?serviceNo=1074&amp;categoryNo=3497
								</Link>
							</p>
						</ScrollArea>
						<div className="flex justify-center items-center gap-8 p-2">
							<Link
								href="https://noonnu.cc/font_page/92"
								title="Go to NoonNu Page"
								target="_blank"
								className="text-primary hover:underline"
							>
								Go to NoonNu Page
							</Link>
							<Link
								href="https://d2.naver.com/news/6492529"
								title="Go to Download page"
								target="_blank"
								className="text-primary hover:underline"
							>
								Go to Download page
							</Link>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</>
	);
};

export default Page;
