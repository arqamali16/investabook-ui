import React, { PureComponent } from 'react';
import { Card, Col, Progress, Row, Spin, Statistic, Table, Tabs } from 'antd';
import _ from 'lodash';
import ReportLogic from '../../Logics/reportsLogic';
import { useValues } from 'kea';

// @ts-ignore
import C3Chart from 'react-c3js';
import 'c3/c3.css';

const groupRecordData: any = [
	{
		name: 'Student 1',
		marks: '30',
		campus: 'campus 1',
		course: 'course 3',
		gender: 'male',
		enroll_id: '1',
	},
	{
		name: 'Student 2',
		marks: '22',
		campus: 'campus 3',
		course: 'course 1',
		gender: 'female',
		enroll_id: '2',
	},
	{
		name: 'Student 3',
		marks: '80',
		campus: 'campus 2',
		course: 'course 1',
		gender: 'female',
		enroll_id: '3',
	},
	{
		name: 'Student 4',
		marks: '61',
		campus: 'campus 4',
		course: 'course 2',
		gender: 'male',
		enroll_id: '4',
	},
	{
		name: 'Student 5',
		marks: '54',
		campus: 'campus 4',
		course: 'course 2',
		gender: 'female',
		enroll_id: '5',
	},
	{
		name: 'Student 6',
		marks: '92',
		campus: 'campus 1',
		course: 'course 1',
		gender: 'male',
		enroll_id: '6',
	},
	{
		name: 'Student 7',
		marks: '34',
		campus: 'campus 4',
		course: 'course 2',
		gender: 'female',
		enroll_id: '7',
	},
	{
		name: 'Student 8',
		marks: '76',
		campus: 'campus 2',
		course: 'course 3',
		gender: 'female',
		enroll_id: '8',
	},
	{
		name: 'Student 9',
		marks: '88',
		campus: 'campus 1',
		course: 'course 2',
		gender: 'female',
		enroll_id: '9',
	},
	{
		name: 'Student 10',
		marks: '96',
		campus: 'campus 2',
		course: 'course 1',
		gender: 'male',
		enroll_id: '10',
	},
	{
		name: 'Student 11',
		marks: '43',
		campus: 'capmus 3',
		course: 'course 2',
		gender: 'male',
		enroll_id: '11',
	},
	{
		name: 'Student 12',
		marks: '56',
		campus: 'campus 1',
		course: 'course 3',
		gender: 'female',
		enroll_id: '12',
	},
	{
		name: 'Student 13',
		marks: '82',
		campus: 'campus 4',
		course: 'course 2',
		gender: 'female',
		enroll_id: '13',
	},
	{
		name: 'Student 14',
		marks: '78',
		campus: 'campus 2',
		course: 'course 3',
		gender: 'female',
		enroll_id: '14',
	},
	{
		name: 'Student 15',
		marks: '64',
		campus: 'campus 1',
		course: 'course 1',
		gender: 'male',
		enroll_id: '15',
	},
];

const toppersColumns = [
	{
		name: '#',
		dataIndex: '',
		key: '',
		render: (value: any, record: any, index: any) => index + 1,
	},
	{
		title: 'Student Name',
		dataIndex: 'name',
		key: 'name',
	},

	{
		title: 'Student Name',
		dataIndex: 'marks',
		key: 'marks',
	},
];

const perCampusColumns = [
	{
		title: 'Campus',
		dataIndex: 'campus',
		key: 'campus',
	},
	{
		title: 'Number of Students',
		dataIndex: 'students',
		key: 'students',
	},
];

const perCourseColumns = [
	{
		title: 'Course',
		dataIndex: 'course',
		key: 'course',
	},
	{
		title: 'Number of Students',
		dataIndex: 'students',
		key: 'students',
	},
];

let genderPerCourseColumns: any = [
	{
		title: 'Gender',
		dataIndex: 'gender',
		key: 'gender',
	},
];

let genderPerCampusColumns = [
	{
		title: 'Gender',
		dataIndex: 'gender',
		key: 'gender',
	},
];

const Reports = (props: any) => {
	const { reportLoading } = useValues(ReportLogic);

	const getTheNumbers = (): any => {
		const totalStudents = _.size(groupRecordData);
		const males = _.size(_.filter(groupRecordData, ['gender', 'male']));
		const females = _.size(_.filter(groupRecordData, ['gender', 'female']));
		const distinctions = _.size(_.filter(groupRecordData, (each) => each.marks > 70));
		const distinctionsWithHonors = _.size(_.filter(groupRecordData, (each) => each.marks > 85));
		const distinctionsWithHighestHonors = _.size(_.filter(groupRecordData, (each) => each.marks > 95));

		const campusGroup = _.groupBy(groupRecordData, 'campus');

		const perCampus = _.map(_.keys(campusGroup), (each) => ({
			campus: each,
			students: _.size(_.get(campusGroup, [each])),
		}));

		const courseGroup = _.groupBy(groupRecordData, 'course');

		genderPerCourseColumns = [
			...genderPerCourseColumns,
			..._.map(_.keys(courseGroup), (each) => ({ title: _.upperFirst(each), dataIndex: each, key: each })),
		];

		genderPerCampusColumns = [
			...genderPerCampusColumns,
			..._.map(_.keys(campusGroup), (each) => ({ title: _.upperFirst(each), dataIndex: each, key: each })),
		];

		const perCourse = _.map(_.keys(courseGroup), (each) => ({
			course: each,
			students: _.size(_.get(courseGroup, [each])),
		}));

		const genderGroup = _.groupBy(groupRecordData, 'gender');

		const genderPerCourse = _.map(_.keys(genderGroup), (each: string) => {
			const genderCourseGroup = _.groupBy(_.get(genderGroup, [each]), 'course');
			let genderCourse = _.mapValues(genderCourseGroup, (values, key) => {
				return _.size(values);
			});
			_.setWith(genderCourse, 'gender', each, Object);
			return genderCourse;
		});

		const genderPerCampus = _.map(_.keys(genderGroup), (each: string) => {
			const genderCampusGroup = _.groupBy(_.get(genderGroup, [each]), 'campus');
			let genderCourse = _.mapValues(genderCampusGroup, (values, key) => {
				return _.size(values);
			});
			_.setWith(genderCourse, 'gender', each, Object);
			return genderCourse;
		});

		const toppers = _.reverse(
			_.slice(_.sortBy(groupRecordData, ['marks']), _.size(groupRecordData) - 3, _.size(groupRecordData)),
		);

		return {
			totalStudents,
			males,
			females,
			distinctions,
			toppers,
			distinctionsWithHonors,
			distinctionsWithHighestHonors,
			perCampus,
			perCourse,
			genderPerCourse,
			genderPerCampus,
		};
	};

	const axis = {
		x: {
			type: 'category',
		},
	};

	const {
		totalStudents,
		males,
		females,
		distinctions,
		toppers,
		distinctionsWithHonors,
		distinctionsWithHighestHonors,
		perCampus,
		perCourse,
		genderPerCourse,
		genderPerCampus,
	} = getTheNumbers();

	const studentsPerCampusGraph = {
		x: 'x',
		columns: [
			['x', ..._.map(_.keys(_.groupBy(groupRecordData, 'campus')), (each) => each)],
			['No of Students', ..._.map(perCampus, (each) => each.students)],
		],
		types: {
			'No of Students': 'area',
		},
		colors: {
			'No of Students': '#876800',
		},
	};

	const studentsPerCourseGraph = {
		x: 'x',
		columns: [
			['x', ..._.map(perCourse, (each) => each.course)],
			['No of Students', ..._.map(perCourse, (each) => each.students)],
		],
		types: {
			'No of Students': 'area',
		},
		colors: {
			'No of Students': '#5cdbd3',
		},
	};

	const genderGroup = _.groupBy(groupRecordData, 'gender');

	const genderPerCourseGraph = {
		x: 'x',
		columns: [
			['x', 'course 1', 'course 2', 'course 3'],
			['male', 3, 1, 2],
			['female', 2, 3, 4],
		],
		types: {
			male: 'area',
			female: 'area',
		},
		groups: [['male', 'female']],
		colors: {
			male: '#3f6600',
		},
	};

	const genderPerCampusGraph = {
		x: 'x',
		columns: [
			['x', 'campus 1', 'campus 2', 'campus 3', 'campus 4'],
			['male', 3, 1, 1, 1],
			['female', 2, 3, 1, 3],
		],
		types: {
			male: 'area',
			female: 'area',
		},
		groups: [['male', 'female']],
		colors: {
			'No of Students': '#3f6600',
		},
	};

	const toppersGraph = {
		columns: [
			['All Students Marks', ..._.map(groupRecordData, (each) => each.marks)],
			['Toppers', 0, 0, 0, 0, 0, 0, 0, 0, 96, 92, 88],
		],
		types: {
			'All Students Marks': 'area-spline',
			Toppers: 'bar',
		},
		colors: {
			Toppers: '#003a8c',
			'All Students Marks': '#91d5ff',
		},
	};

	return (
		<Spin spinning={reportLoading}>
			<Row gutter={[16, 24]}>
				<Col span={6}>
					<Card size='small'>
						<Statistic title='Total' value={totalStudents} />
						<Progress percent={100} status='active' showInfo={false} format={() => totalStudents} />
					</Card>
				</Col>
				<Col span={6}>
					<Card size='small'>
						<Statistic title='Males' value={males} />
						<Progress
							percent={_.round((males / totalStudents) * 100, 1)}
							status='active'
							strokeColor='red'
						/>
					</Card>
				</Col>
				<Col span={6}>
					<Card size='small'>
						<Statistic title='Females' value={females} />
						<Progress
							percent={_.round((females / totalStudents) * 100, 1)}
							status='active'
							strokeColor='green'
						/>
					</Card>
				</Col>
				<Col span={6}>
					<Card size='small'>
						<Statistic title='Distinctions' value={distinctions} />
						<Progress
							percent={_.round((distinctions / totalStudents) * 100, 1)}
							status='active'
							strokeColor='orange'
						/>
					</Card>
				</Col>
				<Col span={6}>
					<Card size='small'>
						<Statistic title='85 and Above' value={distinctionsWithHonors} />
						<Progress
							percent={_.round((distinctionsWithHonors / totalStudents) * 100, 1)}
							status='active'
							strokeColor='cyan'
						/>
					</Card>
				</Col>
				<Col span={6}>
					<Card size='small'>
						<Statistic title='90 and Above' value={distinctionsWithHighestHonors} />
						<Progress
							percent={_.round((distinctionsWithHighestHonors / totalStudents) * 100, 1)}
							status='active'
							strokeColor='gold'
						/>
					</Card>
				</Col>
			</Row>
			<Row gutter={[16, 16]}>
				<Col span={12}>
					<Table dataSource={perCampus} columns={perCampusColumns} pagination={false} />
				</Col>
				<Col span={12}>
					<Card size='small'>
						<C3Chart data={studentsPerCampusGraph} axis={axis} />
					</Card>
				</Col>
				<Col span={12}>
					<Table dataSource={perCourse} columns={perCourseColumns} pagination={false} />
				</Col>
				<Col span={12}>
					<Card size='small'>
						<C3Chart data={studentsPerCourseGraph} axis={axis} />
					</Card>
				</Col>
				<Col span={12}>
					<Table dataSource={genderPerCourse} columns={genderPerCourseColumns} pagination={false} />
				</Col>

				<Col span={12}>
					<Card size='small'>
						<C3Chart data={genderPerCourseGraph} axis={axis} />
					</Card>
				</Col>
				<Col span={12}>
					<Table dataSource={genderPerCampus} columns={genderPerCampusColumns} pagination={false} />
				</Col>
				<Col span={12}>
					<Card size='small'>
						<C3Chart data={genderPerCampusGraph} axis={axis} />
					</Card>
				</Col>
				<Col span={12}>
					<Table dataSource={toppers} columns={toppersColumns} pagination={false} />
				</Col>
				<Col span={12}>
					<Card size='small'>
						<C3Chart data={toppersGraph} axis={axis} />
					</Card>
				</Col>
			</Row>
		</Spin>
	);
};

export default Reports;
