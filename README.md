# ScoreBorda 4

The ultimate decision making tool for the troubled mind

----------------
----------------

[View It Live](https://score-borda.vercel.app/)

## Definitions

### Candidates: the object of your indecision

- Whether people, clothes, insurance plans, or quite literally anything else.
SB works to aid you in understanding how you feel about about these candidates.
- Candidates consist of a name, score, and set of features.

### Features: aspects of candidates

- Features help SB understand what is most important to you. They can be anything from
red to votes for president of space to likes kittens; as long as it describes some aspect of a candidate, it's a valid feature.
- Features consist of a name, score, and negativity (+/-1)

### Bordas: The solution

- The Borda is the system by which Features and Candidates are scored and ranked against each other. 
A series of binary choices that help the program (as well as the user) understand where Features 
& Candidates stand in respect to each other. By presenting only two options in each comparison,
the Borda is able to remove much of the overwhelming and confusing aspects of comparing and ranking several choices at once.

---

## Roadmap

- Local Data persistance
- Remote Data persistance <sup>?</sup>
- Candidate-specific Features
	- In SB 0.1, and (as of) SB 0.2.72d634d, the inability to compare candidates that do not share
	  all of their features has been a limitation on the variety of candidates that can be compared.
	  Expanding how SB understands candidates may be an interesting path to take; specifically,
	  the ability to calibrate from a single pool of features and have Candidates draw some (*but not necessarily all*) features from that pool.
