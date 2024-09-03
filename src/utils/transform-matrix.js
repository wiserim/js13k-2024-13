export class TransformMatrix {
	m = [1,0,0,1,0,0];

	reset() {
		this.m = [1,0,0,1,0,0];
		return this;
	}

	multiply(matrix) {
		let t = this,
			m = t.m,
			m0 = m[0] * matrix[0] + m[2] * matrix[1],
        	m1 = m[1] * matrix[0] + m[3] * matrix[1],
        	m2 = m[0] * matrix[2] + m[2] * matrix[3],
        	m3 = m[1] * matrix[2] + m[3] * matrix[3],
        	m4 = m[0] * matrix[4] + m[2] * matrix[5] + m[4],
        	m5 = m[1] * matrix[4] + m[3] * matrix[5] + m[5];
        t.m = [m0,m1,m2,m3,m4,m5];
        return t;
	}

	transform(x, y) {
		let m = this.m;
		return ({
            x: x * m[0] + y * m[2] + m[4],
            y: x * m[1] + y * m[3] + m[5]
        });
	}

	reverseTransform(x, y) {
		let m = this.m,
			//invert
        	d = 1 / (m[0] * m[3] - m[1] * m[2]),
        	im = [ m[3] * d, -m[1] * d, -m[2] * d, m[0] * d, d * (m[2] * m[5] - m[3] * m[4]), d * (m[1] * m[4] - m[0] * m[5]) ];

        return ({
            x: x * im[0] + y * im[2] + im[4],
            y: x * im[1] + y * im[3] + im[5]
        });
	}

	translate(x, y) {
        return this.multiply([1,0,0,1,x,y]);
	}

	rotate(angle, radian = 0){
		let a = radian ? angle : angle * Math.PI / 180,
        	c = Math.cos(a),
        	s = Math.sin(a);    
        return this.multiply([c,s,-s,c,0,0]);
    }

    scale(x, y) {    
        return this.multiply([x,0,0,y,0,0]);
    }

    skew(angleX, angleY, radian = 0) {
    	let r = radian ? 1 : Math.PI / 180;
    	return this.multiply([1,Math.tan(angleY * r),Math.tan(angleX * r),1,0,0]);
    }
}