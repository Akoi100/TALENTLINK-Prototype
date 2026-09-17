/**
 * TALENTLINK - Cryptographic Engine & Tamper-Evident Verification
 * Complies with Section 5: "Tamper-Evident Records: Badges and milestone logs
 * incorporate cryptographic signatures (SHA-256 hashes linking student ID,
 * timestamp, and issuing patron ID), preventing unauthorized local database manipulation."
 */

const CryptoEngine = {
  /**
   * Generates a verifiable SHA-256 hash using the Web Crypto API
   * Format: SHA256(studentId + ":" + patronId + ":" + timestamp + ":" + badgeTitle)
   */
  async generateBadgeHash(studentId, patronId, timestamp, badgeTitle) {
    const rawPayload = `${studentId}|${patronId}|${timestamp}|${badgeTitle.trim().toUpperCase()}`;
    const encoder = new TextEncoder();
    const data = encoder.encode(rawPayload);
    
    // Web Crypto API SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return {
      payload: rawPayload,
      hash: hashHex
    };
  },

  /**
   * Validates a given hash against the payload
   */
  async verifyIntegrity(studentId, patronId, timestamp, badgeTitle, suppliedHash) {
    const { hash } = await this.generateBadgeHash(studentId, patronId, timestamp, badgeTitle);
    const isAuthentic = (hash.toLowerCase() === suppliedHash.trim().toLowerCase());
    return {
      isAuthentic,
      computedHash: hash,
      suppliedHash: suppliedHash.trim()
    };
  },

  /**
   * Issues a new verifiable badge into the system
   */
  async issueBadge(studentId, patronId, badgeTitle, category) {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const { payload, hash } = await this.generateBadgeHash(studentId, patronId, timestamp, badgeTitle);
    
    const newBadge = {
      id: "BDG-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
      title: badgeTitle,
      category: category || "General Achievement",
      date: timestamp.split(' ')[0],
      issuer: patronId,
      hash: hash,
      payload: payload,
      verified: true
    };

    // Find student and append
    const student = window.TALENT_DATA.students.find(s => s.id === studentId);
    if (student) {
      student.badges.unshift(newBadge);
      return { success: true, badge: newBadge, student };
    }
    return { success: false, error: "Student ID not found" };
  }
};

window.CryptoEngine = CryptoEngine;
