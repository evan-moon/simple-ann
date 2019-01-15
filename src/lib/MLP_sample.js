function sigmoid (x) {
	return 1 / (1 + Math.exp(-x));
}

function MSE (targets, values) {
	if (values instanceof Array === false) {
		return false;
	}

	let result = 0;
	targets.forEach((target, i) => {
		result += (0.5 * ((target - values[i]) ** 2));
	});

	return result;
}

// 인풋 초기화
const x1 = 0.2;
const x2 = 0.5;

// 타겟 값 초기화
const t1 = 0.2;
const t2 = 0.7;

// Weights 초기화
const w0 = [[0.1, 0.2], [0.3, 0.1]];
const w1 = [[0.4, 0.5], [0.1, 0.3]];
const learningRate = 0.3;
const limit = 1000; // 학습 횟수

// 두번째 Layer의 Weight들을 업데이트
function updateSecondLayerWeight (targetY, y, prevY, updatedWeight) {
	const v1 = -(targetY - y);
	const v2 = y * (1 - y);
	const def = v1 * v2 * prevY;
	return updatedWeight - (learningRate * def);
}

// 첫번째 Layer의 Weight들을 업데이트
function updateFirstLayerWeight (t1, t2, y1, y2, w1, w2, a, updatedWeight) {
    const e1 = (-(t1 - y1)) * (y1 * (1 - y1)) * w1;
    const e2 = (-(t2 - y2)) * (y2 * (1 - y2)) * w2;
    const v1 = a * (1 - a);
    const v2 = a;
    const def = (e1 + e2) * v1 * v2;

    return updatedWeight - (learningRate * def);
}

// 학습 시작
let i = 0;
for (i; i < limit; i++) {
    let z10 = (x1 * w0[0][0]) + (x2 * w0[1][0]);
    let a10 = sigmoid(z10);
    let z11 = (x1 * w0[0][1]) + (x2 * w0[1][1]);
    let a11 = sigmoid(z11);

    let z20 = (a10 * w1[0][0]) + (a11 * w1[1][0]);
    let a20 = sigmoid(z20);
    let z21 = (a10 * w1[0][1]) + (a11 * w1[1][1]);
    let a21 = sigmoid(z21);

    let e_t = MSE([t1, t2], [a20, a21]);

    console.log(`[${i}] y1 = ${a20}, y2 = ${a21}, E = ${e_t}`);

    // 계산된 기여도들을 사용하여 새로운 Weight로 업데이트
    const newW0 = [
        [updateFirstLayerWeight(t1, t2, a20, a21, w1[0][0], w1[0][1], a10, w0[0][0]), updateFirstLayerWeight(t1, t2, a20, a21, w1[1][0], w1[1][1], a11, w0[0][1])],
        [updateFirstLayerWeight(t1, t2, a20, a21, w1[0][0], w1[0][1], a10, w0[1][0]), updateFirstLayerWeight(t1, t2, a20, a21, w1[1][0], w1[1][1], a11, w0[1][1])]
    ];
    const newW1 = [
        [updateSecondLayerWeight(t1, a20, a10, w1[0][0]), updateSecondLayerWeight(t2, a21, a10, w1[0][1])],
        [updateSecondLayerWeight(t1, a20, a11, w1[1][0]), updateSecondLayerWeight(t2, a21, a11, w1[1][1])]
    ];

    // 업데이트된 Weight들을 반영한다
    newW0.forEach((v, i) => {
        v.forEach((vv, ii) => {
            w0[i][ii] = vv;
        });
    });
    newW1.forEach((v, i) => {
        v.forEach((vv, ii) => {
            w1[i][ii] = vv;
        });
    });
}

console.log(`t1 = ${t1}, t2 = ${t2}`);
