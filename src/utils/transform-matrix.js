/*
 *	TransformMatrix class
 *	@class
 */
export class TransformMatrix {
	m = [1,0,0,1,0,0];

	/**
     * Resets transform matrix
	 * 
     * @return {this}
     */
	reset() {
		this.m = [1,0,0,1,0,0];
		return this;
	}

	/**
     * Multiply matrix by provided one
	 * 
	 * @param {Object} matrix
	 * 
     * @return {this}
     */
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

	/**
     * Transform 2D coordinate
	 * 
	 * @param {number} x X coordinate
	 * @param {number} y Y coordinate
	 * 
     * @return {Object} Transformed coordinate
     */
	transform(x, y) {
		let m = this.m;
		return ({
            x: x * m[0] + y * m[2] + m[4],
            y: x * m[1] + y * m[3] + m[5]
        });
	}

	/**
     * Reveerse transformation of 2D coordinate
	 * 
	 * @param {number} x X coordinate
	 * @param {number} y Y coordinate
	 * 
     * @return {Object} Transformed coordinate
     */
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

	/**
     * Add translation to matrix
	 * 
	 * @param {number} x X coordinate
	 * @param {number} y Y coordinate
	 * 
     * @return {this}
     */
	translate(x, y) {
        return this.multiply([1,0,0,1,x,y]);
	}

	/**
     * Add rotation to matrix
	 * 
	 * @param {number} angle Angle in degrees or radians
	 * @param {boolean} radian Determines if angle is in radians (assumed degrees if false)
	 * 
     * @return {this}
     */
	rotate(angle, radian = 0){
		let a = radian ? angle : angle * Math.PI / 180,
        	c = Math.cos(a),
        	s = Math.sin(a);    
        return this.multiply([c,s,-s,c,0,0]);
    }

    /**
     * Add scale to matrix
	 * 
	 * @param {number} x X scale
	 * @param {number} y Y scale
	 * 
     * @return {this}
     */
    scale(x, y) {    
        return this.multiply([x,0,0,y,0,0]);
    }

    /**
     * Add skew to matrix
	 * 
	 * @param {number} angleX X angle of skew
	 * @param {number} angleY Y angle of skew
     * @param {boolean} radian Determines if angles are in radians (assumed degrees if false)
	 * 
     * @return {this}
     */
    skew(angleX, angleY, radian = 0) {
    	let r = radian ? 1 : Math.PI / 180;
    	return this.multiply([1,Math.tan(angleY * r),Math.tan(angleX * r),1,0,0]);
    }
}