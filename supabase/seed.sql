-- Crescent Global — seed data (mirrors lib/seed.ts)
-- Run after schema.sql. Safe to re-run: uses upserts / delete-then-insert.

-- Institutions -------------------------------------------------------------
insert into public.institutions
  (id, name, location, city, established_year, category, description, external_url, sort_order)
values
  ('crescent-residential-boys-school','Crescent Residential Boys Matriculation School','Seethakathi Nagar, Chennai','Chennai',1967,'education','The founding institution of the Crescent movement — a residential matriculation school in Chennai since 1967.','https://www.crescentschools.edu.in',1),
  ('crescent-girls-school','Crescent Girls Matriculation School','Chennai','Chennai',1976,'education','A matriculation school for girls in Chennai, extending Crescent''s commitment to education for young women.','https://www.crescentschools.edu.in',2),
  ('bsa-crescent-institute','B.S. Abdur Rahman Crescent Institute of Science & Technology','Vandalur, Chennai','Chennai',1984,'education','A deemed-to-be university offering engineering, sciences, management, law and Islamic studies.','https://crescent.education',3),
  ('crescent-innovation-incubation-centre','Crescent Innovation & Incubation Centre (CIIC)','Vandalur, Chennai','Chennai',2017,'innovation','A technology business incubator supporting student and community startups.','https://ciic.io',4),
  ('tbak-college-women','Thassim Beevi Abdul Kader College for Women','Kilakarai, Ramanathapuram','Kilakarai',1988,'education','An arts and science college for women in Kilakarai.','https://tbak.ac.in',5),
  ('muthu-zulaikha-public-school','Muthu Zulaikha Public School','Kilakarai, Ramanathapuram','Kilakarai',1993,'education','A CBSE school in Kilakarai providing English-medium schooling.','',6),
  ('yousuf-zulaikha-hospital','Yousuf Zulaikha Hospital','Kilakarai, Ramanathapuram','Kilakarai',1987,'healthcare','A multi-speciality hospital serving Kilakarai and surrounding villages.','',7),
  ('crescent-school-vandalur','Crescent School (CBSE & IGCSE)','Vandalur, Chennai','Chennai',2013,'education','A co-educational school offering both CBSE and Cambridge IGCSE curricula.','https://www.crescentschools.edu.in',8),
  ('crescent-college-education-madurai','Crescent College of Education','Madurai','Madurai',2005,'education','A teacher-education college in Madurai.','https://crescentcollegeofeducation.in',9),
  ('crescent-yz-school-nursing-madurai','Crescent Yousuf Zulaikha School of Nursing','Madurai','Madurai',2008,'healthcare','A nursing school in Madurai training healthcare professionals.','https://crescentschoolofnursing.in',10),
  ('buhari-aalim-arabic-college','Buhari Aalim Arabic College','Chennai','Chennai',null,'education','An Arabic and Islamic studies college in Chennai.','http://albukhari.in',11),
  ('madurai-crescent-school','Madurai Crescent School','Madurai','Madurai',null,'education','A Crescent school serving families in and around Madurai.','',12),
  ('nagore-crescent-school','Nagore Crescent School','Nagore, Nagapattinam','Nagore',null,'education','A Crescent school in the coastal town of Nagore.','',13),
  ('pearl-matriculation-school','Pearl Matriculation School','Kilakarai, Ramanathapuram','Kilakarai',1993,'education','A matriculation school in Kilakarai focused on foundational learning.','http://www.pearlschool.ac.in',14),
  ('childrens-homes-community-initiatives','Children''s Homes & Community Initiatives','Multiple locations across Tamil Nadu','Multiple',null,'community','Residential children''s homes, orphan care, scholarships and welfare programmes.','',15)
on conflict (id) do update set
  name = excluded.name,
  location = excluded.location,
  city = excluded.city,
  established_year = excluded.established_year,
  category = excluded.category,
  description = excluded.description,
  external_url = excluded.external_url,
  sort_order = excluded.sort_order;

-- Events ----------------------------------------------------------------
delete from public.events where id like 'evt-%';
insert into public.events
  (id, title, date_start, date_end, institution_id, category, location, description, is_featured)
values
  ('evt-founders-day-2026','Crescent Founders'' Day','2026-09-05',null,'bsa-crescent-institute','University','Vandalur Campus, Chennai','Annual commemoration of the founding of the Crescent movement.',true),
  ('evt-alumni-global-meet-2026','Crescent Global Alumni Meet','2026-09-20',null,null,'Alumni','Chennai + Online','A worldwide gathering of Crescent alumni to connect chapters and mentor students.',true),
  ('evt-inter-school-sports-2026','Inter-Crescent Sports Championship','2026-10-10','2026-10-12','crescent-school-vandalur','Sports','Vandalur Campus, Chennai','Athletics, football and kabaddi across every Crescent school.',false),
  ('evt-health-camp-kilakarai-2026','Free Community Health Camp','2026-09-14',null,'yousuf-zulaikha-hospital','Healthcare','Kilakarai, Ramanathapuram','General medicine, eye and dental screening for local families.',false),
  ('evt-research-conclave-2026','Crescent Research & Innovation Conclave','2026-11-03','2026-11-04','crescent-innovation-incubation-centre','Conferences','Vandalur Campus, Chennai','Startup showcase, research papers and industry mentoring.',true),
  ('evt-cultural-fest-2026','Noor — Crescent Cultural Festival','2026-12-05','2026-12-06','tbak-college-women','Cultural','Kilakarai, Ramanathapuram','Music, elocution, art and literary events across Crescent colleges.',false),
  ('evt-nursing-orientation-2026','Nursing Freshers'' Orientation','2026-09-01',null,'crescent-yz-school-nursing-madurai','Healthcare','Madurai','Induction week for the incoming nursing cohort.',false),
  ('evt-teachers-workshop-2026','Network-wide Teachers'' Workshop','2026-10-25',null,'crescent-college-education-madurai','Schools','Madurai','Professional development for teachers from every Crescent school.',false),
  ('evt-community-iftar-drive-2027','Ramadan Community Support Drive','2027-02-20','2027-03-20','childrens-homes-community-initiatives','Community','Multiple locations','Ration kits, scholarships and support for families in the children''s homes.',false),
  ('evt-academic-year-open-2026','Academic Year Opening Assembly','2026-08-31',null,null,'Schools','All campuses','Synchronised opening assembly across the network.',false);

-- News ----------------------------------------------------------------
delete from public.news where id like 'news-%';
insert into public.news
  (id, title, summary, content, institution_id, published_at)
values
  ('news-cgom-launch','Crescent Global Outreach Mission launches unified portal','A new digital portal will act as a glossary, guide and coordination layer across every institution.','The Crescent Global Outreach Mission (CGOM) has launched Crescent Global, a portal that supplements the individual websites of institutions across the network.',null,'2026-08-20'),
  ('news-crescent-institute-ranking','Crescent Institute climbs national research rankings','Sustained investment in laboratories and doctoral programmes lifts research output for a third year.','The B.S. Abdur Rahman Crescent Institute reported growth in funded research projects and publications, with new centres in renewable energy and data science.','bsa-crescent-institute','2026-08-12'),
  ('news-tbak-naac','TBAK College for Women completes accreditation review','The Kilakarai college has submitted its self-study report ahead of a peer-team visit.','Thassim Beevi Abdul Kader College for Women has strengthened community outreach and digital-learning facilities in its latest accreditation cycle.','tbak-college-women','2026-08-05'),
  ('news-yz-hospital-camp','Yousuf Zulaikha Hospital treats 1,200 at coastal health camp','A weekend screening drive in Kilakarai reached fishing families with free diagnostics and medicines.','Yousuf Zulaikha Hospital ran a large community health camp covering general medicine, paediatrics and eye care, supported by nursing-school volunteers.','yousuf-zulaikha-hospital','2026-07-28'),
  ('news-ciic-cohort','CIIC welcomes its largest startup cohort yet','Fifteen ventures — several founded by Crescent alumni — join the incubator''s acceleration track.','The Crescent Innovation & Incubation Centre has onboarded startups spanning agri-tech, health devices and education.','crescent-innovation-incubation-centre','2026-07-15'),
  ('news-schools-common-calendar','Crescent schools adopt a shared academic calendar','Nine schools have aligned term dates and major events to reduce clashes and enable joint programmes.','Following coordination through Crescent Global, the network''s schools have published a common calendar of examinations, holidays and inter-school events.',null,'2026-07-02');
